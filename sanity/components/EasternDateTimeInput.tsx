import React, { useCallback, useMemo } from "react";
import { Stack, Text, TextInput } from "@sanity/ui";
import { set, unset, type DateTimeInputProps } from "sanity";
import { DateTime } from "luxon";

const EASTERN_TZ = "America/New_York";
const LOCAL_INPUT_FORMAT = "yyyy-LL-dd'T'HH:mm";

export default function EasternDateTimeInput(props: DateTimeInputProps) {
 const { value, onChange, readOnly } = props;

 const localValue = useMemo(() => {
  if (!value) return "";

  const dt = DateTime.fromISO(value).setZone(EASTERN_TZ);
  if (!dt.isValid) return "";

  return dt.toFormat(LOCAL_INPUT_FORMAT);
 }, [value]);

 const handleChange = useCallback(
  (event: React.ChangeEvent<HTMLInputElement>) => {
   const nextLocal = event.currentTarget.value;

   if (!nextLocal) {
    onChange(unset());
    return;
   }

   const dt = DateTime.fromFormat(nextLocal, LOCAL_INPUT_FORMAT, {
    zone: EASTERN_TZ,
   });

   if (!dt.isValid) {
    // If the value is temporarily invalid while typing, don’t patch.
    return;
   }

   const nextIsoUtc = dt.toUTC().toISO();
   if (!nextIsoUtc) return;

   onChange(set(nextIsoUtc));
  },
  [onChange],
 );

 // Try to preserve Sanity’s focus handling if present.
 const inputId = (props as unknown as { id?: string }).id;
 const onFocus = (props as unknown as { onFocus?: (event: unknown) => void }).onFocus;
 const onBlur = (props as unknown as { onBlur?: (event: unknown) => void }).onBlur;

 return (
  <Stack space={3}>
   <TextInput
    id={inputId}
    type="datetime-local"
    value={localValue}
    onChange={handleChange}
    readOnly={readOnly}
    onFocus={onFocus as never}
    onBlur={onBlur as never}
   />
   <Text size={1} muted>
    Times are edited as Eastern Time (America/New_York). Stored values remain ISO datetimes.
   </Text>
  </Stack>
 );
}
