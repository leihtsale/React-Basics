import { SetStateAction } from "react";
import { emojis } from "../assets/images/emojis/emojis";

interface ReactCount {
	[key:string]: number;
}

interface ReactionsProps {
    reactCount: ReactCount,
    setReactCount: React.Dispatch<SetStateAction<ReactCount>>,
    reacted: string[],
    setReacted: React.Dispatch<SetStateAction<string[]>>,
}

const Reactions = (props:ReactionsProps) => {

    const handleClick = (id:string) => {

        if(!props.reacted.includes(id)) {
            props.setReactCount( prevState =>{
                return {
                    ...prevState,
                    [id]: prevState[id] + 1,
                }
            })
            props.setReacted( prevState => {
                return [...prevState, id];
            });
        }
        else {
            props.setReactCount( prevState =>{
                return {
                    ...prevState,
                    [id]: prevState[id] - 1,
                }
            })
            props.setReacted( prevState => {
                const emojiId = prevState.indexOf(id);
                const newState = [...prevState];
                newState.splice(emojiId, 1);
                return newState;
            });
        }
    }

    return (
        <div className="d-flex gap-5">
            {emojis.map((emoji, index)=>{
                return (
                    <div key={index} className="d-flex flex-column align-items-center">
                        <img src={emoji.img} style={{cursor: 'pointer'}} onClick={()=> handleClick(emoji.name)} />
                        {(props.reacted.includes(emoji.name)) ? (
                            <p className="fs-2 text-primary text-decoration-underline">{props.reactCount[emoji.name]}</p>

                        ): (
                            <p className="fs-2">{props.reactCount[emoji.name]}</p>
                        )}
                    </div>
                )
            })}
        </div>
    )
}

export default Reactions;