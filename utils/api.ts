const createURL = (path) => {
    return window.location.origin + path
}

export const updatedLog = async (id, content) => {
    const res = await fetch(
        new Request(createURL(`/api/journal/${id}`), {
        method: 'PATCH',
        body: JSON.stringify({content}),
    })
    )
    if (res.ok) {
        const data = await res.json()
        return data.data
    }
    return {error: true, code: 2323, messageForUi: 'Failed to update log'}
}

export const createNewLog = async () => { 
    const res = await fetch(new Request(createURL('/api/journal'), {
        method: 'POST',
        body: JSON.stringify({}),
    }))

    if(res.ok) {
        const data = await res.json()
        return data.data
    }
}

export const askQuestion = async question => {
    const res = await fetch(new Request(createURL('/api/question'), {
        method: 'POST',
        body: JSON.stringify({ question }),
    }))

    if(res.ok) {
        const data = await res.json()
        return data.data
    }
}