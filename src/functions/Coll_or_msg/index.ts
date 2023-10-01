
import fetch from 'node-fetch';

async function DeleteTimelineEntry(input: any) {
  console.log('Deleting contact timeline entry');
  const url = 'https://api.devrev.ai/internal/timeline-entries.delete';
  try {
    const resp = await fetch(url, {
      method: 'POST',
      headers: {
        'authorization': input.context.secrets['service_account_token'],
        'content-type': 'application/json',
        'accept': 'application/json, text/plain, */*',
      },
      body: JSON.stringify({
        'id': input.payload.context.entry_id,
      }),
    });
  
    if (resp.ok) {
      console.log('Deleted contact block successfully');
    } else {
      let body = await resp.text();
      console.log('Error while deleting contact block: ', resp.status, body);
    }
  } catch (error) {
    console.log('Failed to delete timeline entry: ', error);
  }
}

export const run = async (events: any[]) => {
  console.log('Logging input events in render_giphy');
  for (var event of events) {
    console.log(event);
  }

  const input = events[0];
  const action = input.payload.action.id;
  console.log('Current action: ', action);
  try{
    
    if (action === 'Message') {
    console.log('Sending sms');
    await DeleteTimelineEntry(input);
    return;
  }

    if (action === 'Call') {
    console.log('Calling the user');
    await DeleteTimelineEntry(input);
    return;
  }
}catch (error) {
  console.log('Failed to fetch contact block: ', error);
  return;
}
};

export default run;
