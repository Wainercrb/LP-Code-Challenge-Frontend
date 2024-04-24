import { Dispatch, SetStateAction } from "react";
import { useDebouncedCallback } from "use-debounce";

// Material UI
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";

interface Props {
  defaultValue: string;
  setValue: Dispatch<SetStateAction<string>>;
  debounceTime?: number;
  placeholder?: string;
}

function DebounceInputSearch({
  defaultValue,
  setValue,
  debounceTime = 1000,
  placeholder = "search",
}: Props) {
  const debounced = useDebouncedCallback((value) => {
    setValue(value);
  }, debounceTime);

  return (
    <Box>
      <TextField
        sx={{ minWidth: '350px'}}
        label={placeholder}
        defaultValue={defaultValue}
        onChange={(e) => debounced(e.target.value)}
      />
    </Box>
  );
}

export default DebounceInputSearch;
