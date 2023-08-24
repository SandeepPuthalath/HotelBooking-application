

export default function banner(
    title: string,
    desc: string,
    cloudinaryImgUrl: string
){

    return {
        getTitle: () : string => title,
        getDesc: () : string => desc,
        getCloudinaryImgUrl: () : string => cloudinaryImgUrl,
    }

}


export type BannerEntityType = ReturnType<typeof banner>