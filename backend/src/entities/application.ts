export default function application(
    applicantId: string, name: string, GSTNumber: string
){

    return {
        getApplicantId: (): string => applicantId,
        getName: () : string => name,
        getGSTNumber: () : string => GSTNumber
    }
}

export type ApplicationEntityInterface = typeof application