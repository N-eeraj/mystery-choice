const copyLink = url => {
    const dummy = document.createElement('textarea')
    document.body.appendChild(dummy)
    dummy.value = url
    dummy.select()
    document.execCommand('copy')
    document.body.removeChild(dummy)
    alert('Copied Link')
}

export const shareLink = async ({path, query, shareData}) => {
    const url = `${window.location.host}${import.meta.env.BASE_URL}${path}?${query.name}=${query.value}`
    if (navigator.canShare) {
        try {
            shareData.url = url
            await navigator.share(shareData)
        }
        catch {
            copyLink(url)
        }
    }
    else
        copyLink(url)
}