export const islikesControl = (pid : string) => {
    const stLikes = localStorage.getItem('likes')
    if (stLikes) {
        const arr = JSON.parse(stLikes) as string[]
        const index = arr.indexOf(pid)
        if(index === -1) {
            arr.push(pid) //ekleme
        } else {
            arr.splice(index, 1) // silme
        }
        const stArr = JSON.stringify(arr)
        localStorage.setItem('likes', stArr)


    } else {
        const arr = [pid]
        const stArr =  JSON.stringify(arr)
        localStorage.setItem('likes', stArr)
    }

}