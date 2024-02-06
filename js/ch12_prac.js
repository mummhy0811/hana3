const ㄱㄴㄷ = 'ㄱㄲㄴㄷㄸㄹㅁㅂㅃㅅㅆㅇㅈㅉㅊㅋㅌㅍㅎ';
const 가나다='가까나다따라마바빠사싸아자짜차카타파하힣';
  
const searchByKoreanInitialSound = (data, initSound) =>{
    const regexps = [...initSound].map(is => {
        const idx=ㄱㄴㄷ.indexOf(is);
        if(idx==-1) return is;
        const S=가나다.at(idx);
        const endCode=가나다.at(idx+1).charCodeAt(0);
        const E = String.fromCharCode(is==='ㅎ'?endCode:endCode-1);

        return `[${is}${S}-${E}]`;
    });
    const regex=new RegExp(regexps.join(''));
    return data.filter(d=>regex.test(d));
}

const s = ['강원도 고성군', '고성군 토성면', '토성면 북면', '북면', '김1수'];

console.log(searchByKoreanInitialSound(s, 'ㄱㅅㄱ'));
console.log(searchByKoreanInitialSound(s, 'ㅌㅅㅁ'));
console.log(searchByKoreanInitialSound(s, 'ㅂㅁ'));
console.log(searchByKoreanInitialSound(s, 'ㅍㅁ'));
console.log(searchByKoreanInitialSound(s, 'ㄱ1ㅅ'));
