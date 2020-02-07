const express = require('express');
const express_graphql = require('express-graphql');
const {buildSchema} = require('graphql');
//reference : https://www.youtube.com/watch?v=Vs_CBxCfFHk
const coursesData =  [
    {
        id:1,
        title : 'THsi is complter Node',
        author: ' this is author',
        description:'this is desriptip',
        topic: 'Topic1',
        url: 'thisfirsturl.com'
    },
    {
        id:2,
        title : 'THsi is second complter Node',
        author: ' this is second author',
        description:'this is second desriptip',
        topic: 'Topic2',
        url: 'thissecondurl.com'
    },
    {
        id:3,
        title : 'THsi is third Node',
        author: ' this is third author',
        description:'this  third is desriptip',
        topic: 'Topic3',
        url: 'thisthirdurl.com'
    },
    {
        id:4,
        title : 'THsi is fourth complter Node',
        author: ' this is fourth author',
        description:'this fourth is descritpion',
        topic: 'Topic4',
        url: 'thisfourthurl.com'
    }

]


//Graph Schema
const schema = buildSchema(`type Query {  
                                        course(id:Int!): Course
                                        courses(topic:String): [Course]
                                       } 

                                   type Course { 
                                   id: Int 
                                   title:String
                                   author:String
                                   description:String
                                   topic: String
                                   url: String
                                   }`

)
let getCourse = function (args) {

    let id = args.id
    return coursesData.filter(course => {
        return id ==course.id
    })[0]

}

let getCourses = function (args) {

    if(args.topic){
        let topic = args.topic;
        return coursesData.filter(courses => courses.topic == topic)
    } else {
        return coursesData
    }

}



//Root resolver
const root = {
    course : getCourse,
    courses : getCourses

}

//Create an express serveran a GraphQL endpoint
const app  = express();
app.use('/graphql',express_graphql({
    schema:schema,
    rootValue: root,
    graphiql:true
}))


app.listen(4000,()=> { console.log('Server Running at localhost:4000/graphql')})


