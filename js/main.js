// make variables for the questions in an array?
// the possible Wu-Tang sounding names in a random generator
//  

document.querySelector('#generate').addEventListener('click',wuTang)

function wuTang(){
    const questions = ['q1','q2','q3','q4','q5']
    const answers = questions.map(function(question){
        const picked = document.querySelector(`input[name="${question}"]:checked`) //<- instead of using the index we are using the name will only grabbed the ones that are checked(becasue we are using radio)
        return picked ? picked.value : '' //<- the spots stays empty for an unchecked question and does not give us false information
    })
    if(answers.includes('')){
        document.querySelector('#result').innerText = 'Protect your NECK'
        return
    }
    const query = questions
    .map(function(question,index){
        return `${question}=${answers[index]}`;
    })
    .join('&')

    fetch(`/api?${query}`)
        .then(function(response){
            return response.json()
        } )
        .then(function(data) {
            document.querySelector('#result').innerText = `Your Name Is ${data.name}`
        })
}