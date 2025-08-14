export const dummy_defaults = {
  name_first_m: ["Max", "Moritz", "Marius", "Maurice", "Mauritz"],
  name_first_w: ["Mandy", "Mia", "Mara", "Maren", "Marta"],
  name_last: [
    "Müller",
    "Schneider",
    "Fischer",
    "Weber",
    "Meyer",
    "Wagner",
    "Becker",
    "Schulz",
  ],
  address: [
    {
      street: "Musterstraße 1",
      zip: "12345",
      city: "Musterstadt",
    },
  ],
  insurance: [
    {
      name: "Musterkasse",
      number: "01234567890",
    },
  ],
  dependants: [
    {
      name_first: "Bernd",
      name_last: "Mustermann",
      phone: "0211 01234",
      relation: "partner",
    },
    {
      name_first: "Max",
      name_last: "Musterman",
      phone: "0211 01234",
      relation: "child",
    },
  ],
};

export const dummyallcases = [
  {
    id: 40001,
    name_first: "Mandy",
    name_last: "Musterfrau",
    dob: "01.01.1994",
    age: "30",
    gender: "w",
    consultation: {
      start: "01.06.2024",
    },
    address: {
      street: "Musterstraße 1",
      zip: "12345",
      city: "Musterstadt",
    },
    insurance: {
      name: "Musterkasse",
      number: "01234567890",
    },
    dependants: [
      {
        name_first: "Bernd",
        name_last: "Mustermann",
        phone: "0211 01234",
        relation: "partner",
      },
      {
        name_first: "Max",
        name_last: "Musterman",
        phone: "0211 01234",
        relation: "child",
      },
    ],
    manifestation: "Chronische Unterbauchschmerzen",
    imageUrl:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    lastChange: "3h",
    lastChangeDateTime: "2023-01-23T13:23Z",
    findings: [
      {
        id: 1,
        date: "01.06.2024",
        type: "imaging",
        title: "Transvaginaler Ultraschall",
        text: "Uterus: av/af 5x2x2 cm; Endometrium hoch aufgebaut, 8 mm; Ovar rechts: 2,5x2 cm, links: 2x1,5 cm; freie Flüssigkeit im Douglas",
        images: [
          {
            src: "...",
            alt: "Ultraschallbild",
          },
          {
            src: "...",
            alt: "Ultraschallbild",
          },
        ],
      },
    ],
    labs: [
      {
        id: 1,
        date: "01.06.2024",
        type: "blood",
        measurements: {
          blood_count: {
            haemoglobin: 12.5,
            leukocytes: 14,
            thrombocytes: 250,
            erythrocytes: 4.5,
            hematocrit: 40,
            mcv: 90,
            mch: 30,
            mchc: 35,
          },
        },
      },
      {
        id: 2,
        date: "02.06.2024",
        type: "blood",
        measurements: {
          blood_count: {
            haemoglobin: 5,
            leukocytes: 20,
            thrombocytes: 250,
            erythrocytes: 4.5,
            hematocrit: 40,
            mcv: 90,
            mch: 30,
            mchc: 35,
          },
          crp: 15,
        },
      },
      {
        id: 3,
        date: "03.06.2024",
        type: "blood",
        measurements: {
          blood_count: {
            haemoglobin: 12.5,
            leukocytes: 20,
            thrombocytes: 250,
            erythrocytes: 4.5,
            hematocrit: 40,
            mcv: 90,
            mch: 30,
            mchc: 35,
          },
        },
      },
    ],
  },
  // {
  //   id: 40002,
  //   name_first: "Birgit",
  //   name_last: "Mustermensch",
  //   manifestation: "Raumforderung der Brust",
  //   dob: "01.01.1979",
  //   age: "45",
  //   gender: "w",
  //   consultation: {
  //     start: "01.06.2024",
  //   },
  //   address: {
  //     street: "Musterstraße 1",
  //     zip: "12345",
  //     city: "Musterstadt",
  //   },
  //   imageUrl:
  //     "https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
  //   lastChange: "3h",
  //   lastChangeDateTime: "2023-01-23T13:23Z",
  // },
  // {
  //   id: 40003,
  //   name_first: "Kathrin",
  //   name_last: "Müller",
  //   manifestation: "Bauchumfangsvergrößerung, Abgeschlagenheit",
  //   dob: "01.01.1969",
  //   age: "35",
  //   gender: "w",
  //   consultation: {
  //     start: "01.06.2024",
  //   },
  //   address: {
  //     street: "Musterstraße 1",
  //     zip: "12345",
  //     city: "Musterstadt",
  //   },
  //   imageUrl:
  //     "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
  //   lastChange: "3h",
  //   lastChangeDateTime: "2023-01-23T13:23Z",
  // },
];
