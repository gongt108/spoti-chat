import Link from 'next/link';
import styles from '../../styles/SecondPost.module.css';
import Avatar from '../avatar';

// data
const reactArray = [
    { topic: 'components', description: 'components are used to build React App'},
    { topic: 'props', description: 'props are used to pass data down to other components'},
    { topic: 'link tag', description: 'link tag is a next tag used to navigate React App'},
]

export default function SecondPost() {
    const reactArrayDisplay = reactArray.map((obj, idx) => {
        return (
            <div className={styles.card} key={idx}>
                <h3>{obj.topic}</h3>
                <p>{obj.description}</p>
            </div>
        )
    })

    return (
        <div className={styles.container}>
            <h1>Second Post</h1>
            <Avatar />
            <p>React is a frontend framework that allows us to make components and more...</p>

            <div className={styles.grid}>
                {reactArrayDisplay}
            </div>

            <Link href="/">Return Home</Link>
        </div>
    )
}