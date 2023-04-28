import levenshtein from "js-levenshtein";
import {TCompetition, TGrant, TInternship, TVacancy} from "@iisdc/types";
import {decoderShieldIt} from "@iisdc/utils";


// Чтобы отсекались повторящиеся посты, а так же чуть видоизмененные
export const isPostInDbByLevenstein = <T extends TGrant|TInternship|TVacancy|TCompetition>(post:T,posts:T[])=>{
    const levensteinPercentGap=0.92



    for (let i = 0; i<posts.length;i++){
        let dif = levensteinInPercent(decoderShieldIt(post.namePost)!,decoderShieldIt(posts[i].namePost)!)
        if (dif > levensteinPercentGap) {
            return true
        }
    }
    return false
}

export const levensteinInPercent = (a:string,b:string) =>{
    const length = levenshtein(a,b)
    let maxLength = Math.max(a.length,b.length)

    return (maxLength-length)/maxLength
}

