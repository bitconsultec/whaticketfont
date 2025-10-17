import React, { useState, useRef } from "react";
import { TextField, InputAdornment, IconButton } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

const SearchInput = () => {
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef(null);

  return (
    <div
      style={{
        display: "inline-block",
        overflow: "hidden",
        fontSize: "12px",
        width: 300,
      }}
    >
      <TextField
        inputRef={inputRef}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        placeholder="Buscar atendimento ou mensagem"
        variant="outlined"
        size="small"
        InputProps={{
          style: {
            width: 300,
            height: "30px",
            borderRadius: 10,
            fontSize: "12px",
            color: "#FFF",
          },
          startAdornment: (
            <InputAdornment position="start">
              <IconButton
                onClick={() => {
                  setIsFocused(true);
                  inputRef.current.focus();
                }}
                style={{
                  width: "18px",
                  height: "18px",
                }}
              >
                <SearchIcon
                  style={{
                    color: "#FFF", // Ícone branco
                    width: "18px",
                    height: "18px",
                  }}
                />
              </IconButton>
            </InputAdornment>
          ),
        }}
        sx={{
          "& .MuiOutlinedInput-root": {
            "& fieldset": {
              borderColor: "#FFF", // Remove a borda padrão
            },
            "&:hover fieldset": {
              borderColor: "#FFF",
            },
            "&.Mui-focused fieldset": {
              borderColor: "#FFF", // Borda branca quando focado
            },
            "& .MuiInputBase-input::placeholder": {
              color: "#FFF", // Placeholder branco
              fontSize: "12px", // Tamanho da fonte do placeholder
            },
          },
        }}
      />
    </div>
  );
};

export default SearchInput;
