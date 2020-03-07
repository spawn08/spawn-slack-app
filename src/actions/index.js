/**
 * Created by Amar on 07-03-2020.
 */

import * as actionTypes from './types'

export const setUser = user => {
    return {
        type: actionTypes.SET_USER,
        payload: {
            currentUser: user
        }
    }
}