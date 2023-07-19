//@mui
import { IconButton, InputAdornment, TextField } from '@mui/material';
import Box from '@mui/material/Box';
//react
import { useState } from 'react';
//type
import SearchIcon from '@mui/icons-material/Search';
import { useNavigate } from 'react-router-dom';
//-------------------------------------------------------
type Props = {
  labelSearch: string;
};
export default function SearchBar({ labelSearch }: Props) {
  const [searchKey, setSearchKey] = useState<string>('');
  const navigate = useNavigate();

  const handleSearch = () => {
    if (searchKey) {
      navigate(`/TimKiemKhoaHoc/${searchKey}`);
    }
  };

  return (
    <Box
      sx={{
        flexGrow: 0.8,
        mx: 3,
        bgcolor: 'white',
        borderRadius: 1,
      }}
    >
      <TextField
        fullWidth
        value={searchKey}
        placeholder={labelSearch}
        onChange={(e) => setSearchKey(e.target.value)}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <IconButton onClick={handleSearch}>
                <SearchIcon />
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
    </Box>
  );
}
