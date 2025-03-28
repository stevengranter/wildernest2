import { ComboboxData, Select } from "@mantine/core"

export default function CollectionSelectBox({
  data,
  value,
  handleSelectFn,
  defaultValue,
}: {
  data: ComboboxData
  value: string | null | undefined
  handleSelectFn: (selectedValue: string) => void
  defaultValue: string | null | undefined
}) {
  return (
    data &&
    data.length !== 0 && (
      <Select
        label="Choose collection to display"
        placeholder="Pick value"
        data={data}
        value={value}
        defaultValue={defaultValue}
        onChange={(_, option) => handleSelectFn(option.value)}
        my={"md"}
      />
    )
  )
}
