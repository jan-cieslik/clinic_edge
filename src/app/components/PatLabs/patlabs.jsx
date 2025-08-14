import { formatDateTime } from "@/utils/logic/helper";
import AppCard from "../elements/appcard";
import React from 'react';

export default function PatLabs({ data, patid, dict, lang, classname, children }) {
  const { labs, ranges, groups } = data;
  const sortedLabs = [...labs].sort((a, b) => new Date(a.created_at) - new Date(b.created_at));

  const formatRange = (range, gender = "w") => {
    const [low, high] = Array.isArray(range.normal)
      ? range.normal
      : (range.normal?.[gender] || [null, null]);

    if (low === null) return `< ${high} ${range.unit}`;
    if (high === null) return `> ${low} ${range.unit}`;
    return `${low} - ${high} ${range.unit}`;
  };

  const isOutOfRange = (value, range, gender = "w") => {
    const [low, high] = Array.isArray(range.normal)
      ? range.normal
      : (range.normal?.[gender] || [null, null]);

    if (value == null) return false;
    if (low === null) return value > high;
    if (high === null) return value < low;
    return value < low || value > high;
  };

  const isAllEmpty = (groupId, measurement) =>
    sortedLabs.every(lab => {
      const val = groupId ? lab.measurements[groupId]?.[measurement] : lab.measurements[measurement];
      return val === undefined;
    });

  const renderRow = (label, rangeKey, values, nested = false) => (
    <tr key={rangeKey}>
      <td className={nested ? "pl-2" : ""}>
        {label}
      </td>
      <td>{ranges[rangeKey] ? formatRange(ranges[rangeKey]) : 'N/A'}</td>
      {sortedLabs.map((entry, index) => {
        const value = values(entry);
        const highlight = ranges[rangeKey] && isOutOfRange(value, ranges[rangeKey]);
        return (
          <td key={`${index}-${entry.created_at}`} style={{ fontWeight: highlight ? 'bold' : 'normal' }}>
            {value !== undefined ? value : '-'}
          </td>
        );
      })}
    </tr>
  );

  return (
    <div className="">
      <AppCard classname="" title={dict.pat.navigation.findings}>
        <table className="table-auto min-w-full text-left">
          <thead>
            <tr>
              <th></th>
              <th></th>
              {sortedLabs.map(entry => (
                <th key={entry.date}>{formatDateTime(entry.date)}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {groups.map(group => {
              const visibleMeasurements = group.measurements.filter(meas => !isAllEmpty(group.id, meas));
              if (visibleMeasurements.length === 0) return null;

              return (
                <React.Fragment key={group.id}>
                  <tr>
                    <td colSpan={sortedLabs.length + 2} style={{ fontWeight: 'bold' }}>
                      {dict.labs.groups[group.id]}
                    </td>
                  </tr>
                  {visibleMeasurements.map(meas => renderRow(
                    dict.labs.measurements[meas],
                    meas,
                    entry => entry.measurements[group.id]?.[meas],
                    true
                  ))}
                </React.Fragment>
              );
            })}
            {/* Ungrouped measurements */}
            {Object.keys(ranges)
              .filter(meas =>
                !groups.some(group => group.measurements.includes(meas)) &&
                !isAllEmpty(null, meas)
              )
              .map(meas => renderRow(
                dict.labs.measurements[meas],
                meas,
                entry => entry.measurements[meas]
              ))}
          </tbody>
        </table>
      </AppCard>
    </div>
  );
}