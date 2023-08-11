import { Resource, component$,useStylesScoped$ } from "@builder.io/qwik";
import { routeLoader$ } from "@builder.io/qwik-city";
import CSS from './index.css?inline'
import { CONTACTS, Contact } from "../../fake-db";

interface ContactForm {
    contact: Contact;
    errors: { [P in keyof Contact]?: string };
  }


export const useContactData = routeLoader$((ctx) => {
    return CONTACTS.filter((c) => c.id === ctx.params.contactId)[0]
})




export default component$(() => {
    useStylesScoped$(CSS)
    const contact = useContactData()
    return (
        <Resource
            value={contact}
            onPending={() => <div>Loading...</div>}
            onResolved={(c) => {

                return (
                    <form method="POST">
                        <input type="hidden" name="id" value={c.id} />
                        <input type="hidden" name="avatar" value={c.avatar} />
                        <div class="contact">
                        [<a href={`/contacts/${c.id}/`}>cancel</a>]
                        <div class="row">
                            <img class="avatar" src={c.avatar} />
                            <input name="name" value={c.name} />
                            {/* {errors.name && <span class="error">{errors.name}</span>} */}
                        </div>
                        <div class="row">
                            <img
                            class="icon"
                            src="https://abs.twimg.com/favicons/twitter.2.ico"
                            />
                            <input name="twitter" value={c.twitter} />
                        </div>
                        <div class="row">
                            <img
                            class="icon"
                            src="https://github.githubassets.com/favicons/favicon.png"
                            />
                            <input name="github" value={c.github} />
                        </div>
                        <div class="row">
                            <img
                            class="icon"
                            src="https://static-exp1.licdn.com/scds/common/u/images/logos/favicons/v1/favicon.ico"
                            />
                            <input name="linkedin" value={c.linkedin} />
                        </div>
                        </div>
                        <button>Save</button>
                    </form>
                );
            }}
        />
    )
})


export function last<T extends string | undefined>(text: T): T {
    if (text === undefined) {
      return text;
    } else {
      const parts = text.split("/");
      let part: string;
      do {
        part = parts.pop()!;
      } while (parts.length && !part);
      return part as T;
    }
  }
