
const contactBtn = document.querySelector('.btn-black')

const setCookie = (name, param="", maxAge="") =>{
    const key = name
    const value = param
    const expireAfter = maxAge

    document.cookie = `${key}=${value};path=/;max-age=${expireAfter};`;
    // if(document.cookie.split(';').filter(item => item.trim().startsWith()))


}

const getCookie = (name) => {
    const cookiesArr = document.cookie.split(";")
    console.log(cookiesArr)

    for(let i = 0; i < cookiesArr.length; i++){
        const cookiePair = cookiesArr[i].split('=');

        if(name == cookiePair[0].trim()) {
            console.log(cookiePair[1])
            return cookiePair[1]
        }
    }
}
contactBtn.onclick = () => {
    const newUserKey ='new-user';
    const maxAgeValue = 60 * 5;
    const newUser = getCookie(newUserKey);
    console.log('targeted')
    if(newUser == 'true'){
        setCookie(newUserKey, false);
    }
    else if(!newUser){
        setCookie(newUserKey, true);
    }
    setCookie('experiment', 'novalue', maxAgeValue);
    
    console.log(newUser)
    
}

