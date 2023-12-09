import Link from 'next/link';
import Avatar from '../avatar';

// data
const array = [
    'HTML',
    'CSS',
    'JavaScript',
    'EJS',
    'Bootstrap',
    'SQL',
    'Node'
]

export default function FirstPost() {
    const skillsArray = array.map((s, idx) => {
        return <p key={idx}>{s}</p>
    })

    return (
        <div>
            <h1>First Post</h1>
            <Avatar />
            <p>My engineering journey began with learning HTML, CSS, JavaScript, and more.</p>
            <p>I learned {array[6]} for server-side rendering</p>
            <div>
                I have learned the following concepts:
                {skillsArray}
            </div>
            <Link href="/">Return Home</Link>
        </div>
    )
}