import Jokes from "../api/Jokes";
import { useState, useEffect } from "react";

interface Joke {
    id: number,
    setup: string,
    punchline: string,
}

const DailyJoke = () => {

    const [joke, setJoke] = useState({} as Joke)
    const [showPunchline, setShowPunchline] = useState(false);

    const fetchJoke = async () => {
        let res:any;
        try {
            res = await Jokes.get('/random_joke');
        }
        catch {
            setJoke({
                id: 0,
                setup: 'Try Again Later',
                punchline: '',
            })
            return;
        }
        setJoke({
            id: res.data.id,
            setup: res.data.setup,
            punchline: res.data.punchline,
        })
    }

    const handleClick = () => {
        setShowPunchline(!showPunchline);
    }

    useEffect(()=> {
        fetchJoke();
    },[])

    return (
        <>
            <p className="fs-3">{joke.setup}</p>
            {showPunchline ? (<p>{joke.punchline}</p>): null }
            <button className="mt-3" onClick={handleClick}>Continue</button>

        </>
    )

}

export default DailyJoke;