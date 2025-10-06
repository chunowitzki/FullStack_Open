import Header from './Header'
import Content from './Content'
import Total from './Total'

const Course = ({ courses }) => {
    console.log(courses)
    return (
        <>
            {courses.map(c => {
                return (
                    <div key={c.id}>
                        <Header name={c.name}/>
                        <Content parts={c.parts}/>
                        <Total parts={c.parts}/>
                    </div>
                )
            })}
        </>
    )
}

export default Course