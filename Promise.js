// console.log('Request Data..')

// setTimeout(() => {
//     console.log('Preparing data..')

//     const backendData = {
//         server: 'aws',
//         port: 2000,
//         status: 'working'
//     }

//     setTimeout(() => {
//         backendData.modified = true
//         console.log('Data received', backendData)
//     }, 2000)
// }, 2000);

const p = new Promise(function(resolve, reject){
    setTimeout(() => {
console.log('Preparing data..')

    const backendData = {
        server: 'aws',
        port: 2000,
        status: 'working'
        }
    }, 2000)
})