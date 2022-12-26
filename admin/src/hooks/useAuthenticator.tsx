import { useCallback } from "react";
import { User as FirebaseUser } from "firebase/auth";
import {
    Authenticator
} from "@camberi/firecms";

import usersCollection from "../collections/users";

export default function useAuthenticator() {
    const myAuthenticator: Authenticator<FirebaseUser> = useCallback(async ({
        user,
        dataSource
    }) => {

        if (!user?.uid) {
            throw Error("No User ID found.");
            return false
        }

        const userDoc = await dataSource.fetchEntity({ path: `users`, entityId: user?.uid || '', collection: usersCollection })

        if (!userDoc?.id) {
            // If user doesn't exist, then we create it without admin privileges
            await dataSource.saveEntity({
                path: `users`,
                entityId: user?.uid || '',
                collection: usersCollection,
                status: 'new',
                values: {
                    name: user.email || undefined,
                    admin: false
                }
            })
        }

        if (
            !userDoc ||
            !userDoc.values.admin
        ) {
            throw Error("You don't have admin rights.");
            return false
        }

        return true;
    }, []);

    return myAuthenticator
}
