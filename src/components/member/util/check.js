async function checkUserState() {
  try {
    const response = await fetch('http://18.139.60.49:5000/is_logined', {
      method: 'GET',
      credentials: 'include',
      headers: new Headers({
        Accept: 'application/json',
        'Content-Type': 'application/json',
      }),
    });

    // if (!response.ok) throw new Error(response.statusText);

    const jsonObject = await response.json();

    console.log('session:', jsonObject);

    return jsonObject;
  } catch (e) {
    console.log(e);
  } finally {
  }
}

export default checkUserState;
