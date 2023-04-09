import React, {useState, useContext } from "react";

type ImagesState = Array<{ id: string; url: string }>;
type SetImagesState  = React.Dispatch<React.SetStateAction<ImagesState>>;
type ImageProviderProps = {children: React.ReactNode}

const ImagesContext = React.createContext<ImagesState>([]);
const SetImagesContext = React.createContext<SetImagesState|undefined>(undefined);

export const useImages = () => {
    return useContext(ImagesContext);
}

export const useSetImages = ():SetImagesState => {
    const context = useContext(SetImagesContext);
    if (context === undefined) {
      throw new Error('useSetImages must be used within an ImageProvider');
    }
    return context;
};

export const ImagesProvider = (props:ImageProviderProps) => {

    const [images, setImages] = useState<ImagesState>([]);

    return (
        <ImagesContext.Provider value={images}>
            <SetImagesContext.Provider value={setImages}>
                {props.children}
            </SetImagesContext.Provider>
        </ImagesContext.Provider>
    )
}