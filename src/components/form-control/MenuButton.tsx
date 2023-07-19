import MoreVertIcon from '@mui/icons-material/MoreVert';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import * as React from 'react';
import { handleDeleteUser } from '~/redux/slices/listUserSlides';
import { dispatch } from '~/redux/store';
import UserModal from '../modal/ModalUser';

type Props = {
  id: string;
};
export default function MenuButton({ id }: Props) {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const openToolTip = Boolean(anchorEl);

  const [openModal, setOpenModal] = React.useState(false);
  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleDel = () => {
    setAnchorEl(null);
    dispatch(handleDeleteUser(id));
  };

  const options = [
    { label: 'Ghi danh', toolTip: handleOpenModal },
    { label: 'Sửa', toolTip: handleDel },
    { label: 'Xóa', toolTip: handleDel },
  ];

  return (
    <div>
      <IconButton aria-label="more" aria-haspopup="true" onClick={handleClick}>
        <MoreVertIcon />
      </IconButton>
      <Menu anchorEl={anchorEl} open={openToolTip} onClose={handleClose}>
        {options.map((option, index) => (
          <MenuItem key={index} onClick={option.toolTip}>
            {option.label}
          </MenuItem>
        ))}
      </Menu>
      <UserModal id={id} open={openModal} handleClose={handleCloseModal} />
    </div>
  );
}
