'use server'

export default async function test(data: FormData) {
    console.log('odfsd')
    console.log(Object.fromEntries(data))
}
