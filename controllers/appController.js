export const register = async (req, res) => {
    let body = {
        name:'manikanta',
        age:30,
        islogged:true
    }
    res.send({body});
}