
import fetch from 'node-fetch';

async function CreateContactSnapKit(input: any) {
  console.log('Creating snap kit with contact details');
  const url = 'https://api.devrev.ai/timeline-entries.create';
  try {
    const resp = await fetch(url, {
      method: 'POST',
      headers: {
        'authorization': input.context.secrets['service_account_token'],
        'content-type': 'application/json',
        'accept': 'application/json, text/plain, */*',
      },
      body: JSON.stringify({
        'object': input.payload.source_id,
        'body': 'coontact',
        'type': 'timeline_comment',
        'snap_kit_body': {
          'snap_in_id': input.context.snap_in_id,
          'snap_in_action_name': 'coontact',
          'body': {
            'snaps': [{
              'type': 'card',
              'title': {
                'text': input.payload.parameters,
                'type': 'plain_text',
              },
              'elements': [
                {
                  'direction': 'row',
                  'justify': 'center',
                  'type': 'actions',
                  'elements': [
                    {
                      'action_id': 'Call',
                      'action_type': 'remote',
                      'style': 'primary',
                      'type': 'button',
                      'value': 'Call',
                      'text': {
                        'text': 'Call',
                        'type': 'plain_text',
                      },
                    },
                    {
                      'action_id': 'Messsage',
                      'action_type': 'remote',
                      'style': 'primary',
                      'type': 'button',
                      'value': 'Message',
                      'text': {
                        'text': 'Message',
                        'type': 'plain_text',
                      },
                    },
                  ],
                },
              ],
            }],
          },
        },
      }),
    });

     if (resp.ok) {
      console.log('Contact snap kit created successfully');
    } else {
      let body = await resp.text();
      console.log('Error while posting to timeline: ', resp.status, body);
    }
  } catch (error) {
    console.log('Failed to post to timeline: ', error);
  }
}

export const run = async (events: any[]) => {
  console.log('Logging input events');
  for (var event of events) {
    console.log(event);
  }

  const input = events[0];
  try {
    await CreateContactSnapKit(input);
  } catch (error) {
    console.log('Failed to create contact page : ', error);
  }
};

export default run;