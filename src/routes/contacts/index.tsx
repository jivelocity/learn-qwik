import { Resource, component$, useComputed$, useSignal, useStylesScoped$ } from '@builder.io/qwik';
import { routeLoader$ } from '@builder.io/qwik-city';
import { CONTACTS, Contact} from './fake-db';
import CSS from './index.css?inline'

export const useContactData = routeLoader$(async () => {
    return await Promise.resolve(CONTACTS.map((c) => { // CONTACTS di map ke dalam array baru jadi tidak menampilkan data object yang tidak dibutuhkan
        return {
            id: c.id,
            name: c.name,
            avatar: c.avatar,
        }
    })) as Contact[];
})

export default component$(() => {

    useStylesScoped$(CSS);

    const contacts = useContactData();
    const filter = useSignal('');

    const filteredContacts = useComputed$(() => {
        return contacts.value.filter((c) => c.name.toLowerCase().indexOf(filter.value.toLowerCase()) > -1)
    })

    return (
        <div>
            <h3>Contacts</h3>
            <input placeholder='Search' onInput$={(event) => {
                filter.value = (event.target as HTMLInputElement).value;
            }} />
            <Resource
                value={contacts}
                onPending={() => <div>Loading...</div>}
                onResolved={() => {
                    return (
                        <ul>
                            {filteredContacts.value
                                .map((contact) => (
                                <li key={contact.id}>
                                    <a href={"/contacts/" + contact.id + "/"}>
                                        <img src={contact.avatar} alt={contact.name} />
                                        {contact.name}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    );
                }}
            />
        </div>
    )
})
