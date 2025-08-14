import { getUser } from "@/utils/logic/logic_server";
import { createClient } from "@/utils/supabase/server";
import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { headers } from "next/headers";
import OpenAI from "openai";
import { v4 as uuidv4 } from "uuid"; // Import UUID to generate unique filenames

async function getResponse(messages) {
  const openai = new OpenAI({ apiKey: process.env["OPENAI_API_KEY"] });

  const completion = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: messages,
  });
  return completion.choices[0].message.content;
}
async function getResponseAudio(messages, createAudio=false) {
  const hasAudio = messages.some((entry) =>
    entry.content?.some((contentItem) => contentItem.type === "input_audio")
  );
  const openai = new OpenAI({ apiKey: process.env["OPENAI_API_KEY"] });
  const completion = await openai.chat.completions.create({
    model: (createAudio || hasAudio) ? "gpt-4o-mini-audio-preview": "gpt-4o-mini",
    modalities: createAudio ? ["text", "audio"]: ["text"],
    audio: { voice: "alloy", format: "wav" },
    messages: messages,
    store: true,
  });
  return completion.choices[0].message;
}

async function fetchMessages(supabase, userId, pat_id) {
  var res = await supabase
    .from("PatChat")
    .select(
      "id, created_at, content, instance, role, type, audio_base64, PatBase(userId)"
    )
    .eq("PatBase.userId", userId)
    .eq("pat_id", pat_id);
  if (res.error) {
    console.warn(res.error);
  }
  return res.data;
}

async function fetchPatInfo(supabase, userId, pat_id) {
  var res = await supabase
    .from("PatBase")
    .select("*")
    .eq("userId", userId)
    .eq("pat_id", pat_id)
    .maybeSingle();
  if (res.error) {
    console.warn(res.error);
  }
  return res.data;
}

async function pushMessage(supabase, messages) {
  var res = await supabase.from("PatChat").insert(messages).select();
  if (res.error) {
    console.warn(res.error);
  }
  return res.data;
}

const s3Client = new S3Client({
  endpoint: process.env.CLOUDFLARE_ENDPOINT,
  region: "auto",
  credentials: {
    accessKeyId: process.env.CLOUDFLARE_ACCESS_KEY_ID,
    secretAccessKey: process.env.CLOUDFLARE_SECRET_ACCESS_KEY,
  },
});

async function uploadAudioToS3(fileBuffer, fileName, fileType) {
  const key = `audio/${Date.now()}_${uuidv4()}.${fileName.split(".").pop()}`;
  await s3Client.send(
    new PutObjectCommand({
      Bucket: process.env.CLOUDFLARE_BUCKET_NAME,
      Key: key,
      Body: fileBuffer,
      ContentType: fileType,
    })
  );
  return process.env.NEXT_PUBLIC_FILES_URI + key;
}

export async function GET(request, props) {
  const params = await props.params;
  var pat_id = params.patid;
  const { userId } = await getUser();
  if (!userId) {
    return new NextResponse("Unauthorized", { status: 401 });
  }
  const supabase = await createClient();
  var data = fetchMessages(supabase, userId, pat_id);

  return Response.json(data);
}

export async function POST(request, props) {
  const headersList = await headers();
  const contentType = headersList.get("content-type");
  const isMultipart = contentType.startsWith("multipart/form-data");
  const params = await props.params;
  var pat_id = params.patid;
  const { userId } = await getUser();
  if (!userId) {
    return new NextResponse("Unauthorized", { status: 401 });
  }
  const supabase = await createClient();
  var previous_messages = await fetchMessages(supabase, userId, pat_id);
  var pat_info = await fetchPatInfo(supabase, userId, pat_id);
  var messages = previous_messages.map(
    ({ role, content, type, audio_base64 }) => ({
      role,
      content:
        type === "input_audio"
          ? [{ type: type, input_audio: { data: audio_base64, format: "wav" } }]
          : [{ type: type, text: content }],
    })
  );
  messages.unshift({
    role: "developer",
    content: [
      {
        type: "text",
        text:
          "Speak German! Use Sie instead of Du. Never use the first name of the interviewer. Always be polite. You are a patient that is being questioned by a junior doctor. Do not improvise the answers stick to the predefined symptoms and findings encoded in JSON. Be honest, better to say that you do not know than to lie. We use the metric system. You don't know any technical terms, speak in layman terms. last_menstrual_period encodes how many days ago the first day of your last period was. vignette is a case description that the interviewer received. vignette_patient is a case description that you (the patient) received. " +
          JSON.stringify(pat_info.pat_data),
      },
    ],
  });
  if (isMultipart) {
    const formData = await request.formData();
    const file = formData.get("audio");
    if (!file) {
      return NextResponse.json(
        { success: false, error: "No file uploaded" },
        { status: 400 }
      );
    }
    const arrayBuffer = await file.arrayBuffer();
    const InputFileBuffer = Buffer.from(arrayBuffer);
    const base64Audio = InputFileBuffer.toString("base64");
    // const mimeType = file.type;
    // const base64String = `data:${mimeType};base64,${base64Audio}`;

    var new_message = {
      role: "user",
      content: [
        {
          type: "input_audio",
          input_audio: { data: base64Audio, format: "wav" },
        },
      ],
    };
    messages.push(new_message);
    var response = await getResponseAudio(messages, true);

    //
    // const input_url = await uploadAudioToS3(InputFileBuffer, file.name, file.type);
    // const OutputFileBuffer = Buffer.from(response.audio.data, 'base64')
    // const output_url = await uploadAudioToS3(OutputFileBuffer, "output.wav", "audio/wav");

    var update = [
      {
        role: "user",
        content: "(Voice Message)",
        pat_id: pat_id,
        audio_base64: base64Audio,
        type: "input_audio",
      },
      {
        role: "assistant",
        content: response.audio.transcript,
        pat_id: pat_id,
        audio_base64: response.audio.data,
        type: "text",
        audio_id: response.audio.id,
      },
    ];
    var res_update = await pushMessage(supabase, update);
    return Response.json(res_update);
  } else {
    const res = await request.json();
    var new_message = { role: "user", content: [{type:"text", text:res.content}] };
    messages.push(new_message);
    var response = await getResponseAudio(messages, false);
    var update = [
      { role: "user", content: res.content, pat_id: pat_id },
      { role: "assistant", content: response.content, pat_id: pat_id },
    ];
    var res_update = await pushMessage(supabase, update);
  }
  return Response.json(res_update);
}
