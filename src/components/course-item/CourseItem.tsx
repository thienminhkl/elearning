import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Rating,
  Stack,
  Typography,
} from '@mui/material';
import { useState } from 'react';
import { Course } from '~/type/course/course';
import defaultImg from '../../assets/img/default-course.png';
//---------------------------------------------------------------------
type Props = {
  course: Course | null;
};

export default function CourseItem({ course }: Props) {
  const [value, setValue] = useState<number | null>(4.5);

  return (
    <Card
      variant="outlined"
      sx={{
        maxWidth: 345,
        textAlign: 'center',
        borderRadius: 3,
      }}
    >
      <Box sx={{ position: 'relative' }}>
        <img
          style={{ height: 140, width: 230, objectFit: 'contain' }}
          src={course?.hinhAnh}
          alt={course?.moTa}
          onError={(e) => ((e.target as HTMLImageElement).src = defaultImg)}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {course?.tenKhoaHoc}
          </Typography>
          <Stack direction={'row'}>
            <Rating
              precision={0.5}
              value={value}
              onChange={(_, newValue) => {
                setValue(newValue);
              }}
            />
            <Typography variant="subtitle2">
              {value} ({course?.luotXem})
            </Typography>
          </Stack>
        </CardContent>
        <CardActions sx={{ justifyContent: 'right' }}>
          <Button variant="contained" href={`/detail/${course?.maKhoaHoc}`}>
            ĐĂNG KÝ
          </Button>
        </CardActions>
      </Box>
    </Card>
  );
}
