import { Button } from "./button";

export default async function VideoComponent({ src, title }) {


    // return <iframe className="w-full aspect-video" src={src} frameborder="0" allowfullscreen />
    return (
        <div className="card  card-compact w-full bg-base-100 shadow-xl">
            <iframe frameborder="0" allowfullscreen className="w-full aspect-video" src={src} alt="Shoes" />
            <div className="card-body">
                <h2 className="p-2 font-bold text-slate-900 card-title">Shoes!</h2>
            </div>
        </div>
    )
}