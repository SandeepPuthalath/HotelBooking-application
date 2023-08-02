export default function application(
    applicantId: string, name: string, GSTNumber: string
){

    return {
        getApplicantId: () => applicantId,
        getName: () => name,
        getGSTNumber: () => GSTNumber
    }
}

export type applicationEntityInterface = typeof application