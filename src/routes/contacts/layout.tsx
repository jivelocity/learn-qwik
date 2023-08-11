import { Slot, component$ } from "@builder.io/qwik"


export default component$(() => {
    return (
        <>
            <main>
                <h1>Contacts Demo</h1>
                <section>
                    <Slot />
                </section>
            </main>
        </>
    )
})
