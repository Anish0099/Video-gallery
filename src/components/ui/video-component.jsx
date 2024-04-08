export default async function VideoComponent({ src }) {


    return <iframe className="w-full aspect-video" src={src} frameborder="0" allowfullscreen />
}