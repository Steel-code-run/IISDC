import {TCompetition, TGrant, TInternship, TPostType, TVacancy} from "@iisdc/types";

export type TComponentPage<T extends TPostType> = {
    postType : T;
    props: T extends TPostType.grant ? TGrant :
            T extends TPostType.vacancy ? TVacancy :
                T extends TPostType.internship ? TInternship :
                    T extends TPostType.competition ? TCompetition :
                        never
}

export type TTypesOfPosts = TGrant | TCompetition | TInternship | TVacancy;