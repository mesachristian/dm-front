interface IVideoModule{
    id: string;
    name: string;
    order: number;
    lessons: IModuleLesson[];
}

interface IModuleLesson{
    id: string;
    name: string;
    order: number;
}