import { Box, Button, Card, Collapse, List, ListItemButton, ListItemText, Typography } from "@mui/material";
import { useState } from "react";
import { CustomCard, FlexBox } from "../styled-components/global.component";

import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import { ExpandLess, ExpandMore } from "@mui/icons-material";

import { Reorder, useDragControls, useMotionValue } from "framer-motion";
import { useRaisedShadow } from "./use-raised-shadow";
import ReorderIcon from "../reorder-icon/reoder-icon.component";
import { useNavigate } from "react-router-dom";

interface VideoMoulesCollapseListProps{
    courseModules: IVideoModule[];
}

const VideoMoulesCollapseList = ({ courseModules }: VideoMoulesCollapseListProps) => {

    const [items, setItems] = useState(courseModules);

    const handleLessonsChanged = (id: string, lessons: any[]) => {
        setItems((prev) => {
            return prev.map((el) => {
                if (id == el.id) {
                    el.lessons = lessons;
                }
                return el;
            });
        })
    }

    return (
        <Reorder.Group style={{ listStyle: 'none', padding: 0 }} axis="y" values={items} onReorder={setItems}>
            {items.map((item) => (
                <Module key={item.id} module={item} handleLessonsChanged={handleLessonsChanged} />
            ))}
        </Reorder.Group>

    );
}

interface ModuleProps {
    module: any;
    handleLessonsChanged: (id: string, lessons: any[]) => void;
}

const Module = ({ module, handleLessonsChanged }: ModuleProps) => {
    const y = useMotionValue(0);
    const boxShadow = useRaisedShadow(y);
    const dragControls = useDragControls();



    const [showItems, setShowItems] = useState<boolean>(false);

    const handleClick = () => {
        setShowItems(!showItems);
    };

    return (
        <Reorder.Item
            value={module}
            id={module.id}
            style={{ boxShadow, y, listStyle: 'none' }}
            dragListener={false}
            dragControls={dragControls}
        >
            <Card
                sx={{
                    display: 'flex',
                    border: '1px solid',
                    borderColor: 'divider',
                    padding: '1rem',
                    alignItems: 'center',
                    mt: 1
                }}>

                <ReorderIcon dragControls={dragControls} />

                <div style={{ marginLeft: 10, flexGrow: '1', display: 'flex', justifyContent: 'space-between' }}>
                    <FlexBox style={{ cursor: 'pointer' }} onClick={handleClick}>
                        {showItems ? <ExpandLess /> : <ExpandMore />}
                        <Typography style={{ userSelect: 'none' }}>
                            {module.label}
                        </Typography>
                    </FlexBox>

                    <AddOutlinedIcon style={{ cursor: 'pointer' }} />
                </div>
            </Card>

            <Collapse in={showItems} timeout="auto" unmountOnExit>

                <Lessons lessons={module.lessons} setLessons={(lessons) => handleLessonsChanged(module.id, lessons)} />

            </Collapse>

        </Reorder.Item>
    );
}

import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';

interface LessonsProps {
    lessons: any[];
    setLessons: (lessons: any[]) => void;
};

const Lessons = ({ lessons, setLessons }: LessonsProps) => {

    const navigate = useNavigate();

    return (
        <Reorder.Group
            style={{ listStyle: 'none', padding: 0 }}
            axis="y"
            values={lessons}
            onReorder={setLessons}>
            {lessons.map((lesson: any) => {
                return (
                    <Reorder.Item
                        value={lesson}
                        id={lesson.id}
                        key={lesson.id}
                        style={{ listStyle: 'none' }}
                    >
                        <Card sx={{ p: 2, display: 'flex', alignItems: 'center', borderRadius: 0 }}>
                            <ReorderIcon width={14} height={14} />
                            <Box
                                sx={{
                                    px: 2,
                                    flexGrow: 1,
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'space-between'
                                }}>
                                <Typography style={{ userSelect: 'none' }} variant="body2">
                                    {lesson.label}
                                </Typography>

                                <Box>
                                    <Button color="secondary" sx={{ mx: '5px', minWidth: '30px' }} onClick={() => navigate('/james')}>
                                        <EditOutlinedIcon fontSize="small" />
                                    </Button>

                                    <Button color="secondary" sx={{ mx: '5px', minWidth: '30px' }} onClick={() => navigate('/james')}>
                                        <DeleteOutlineIcon fontSize="small" />
                                    </Button>
                                </Box>
                            </Box>
                        </Card>
                    </Reorder.Item>
                );
            })}

        </Reorder.Group>
    );
}

export default VideoMoulesCollapseList;