// Test file to verify Supabase data fetching
const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
const supabaseAnonKey = process.env.REACT_APP_SUPABASE_ANON_KEY;

console.log('Supabase URL:', supabaseUrl);
console.log('Supabase Key:', supabaseAnonKey ? 'Present' : 'Missing');

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function testFetch() {
  console.log('\n=== Testing Services Table ===');
  try {
    const { data: services, error: servicesError } = await supabase
      .from('services')
      .select('*')
      .order('"order"', { ascending: true });
    
    if (servicesError) {
      console.error('Services Error:', servicesError);
    } else {
      console.log('Services Count:', services?.length || 0);
      console.log('Services Data:', JSON.stringify(services, null, 2));
    }
  } catch (err) {
    console.error('Services Exception:', err);
  }

  console.log('\n=== Testing Clients Table ===');
  try {
    const { data: clients, error: clientsError } = await supabase
      .from('clients')
      .select('*')
      .order('"order"', { ascending: true });
    
    if (clientsError) {
      console.error('Clients Error:', clientsError);
    } else {
      console.log('Clients Count:', clients?.length || 0);
      console.log('Clients Data:', JSON.stringify(clients, null, 2));
    }
  } catch (err) {
    console.error('Clients Exception:', err);
  }

  console.log('\n=== Testing Projects Table ===');
  try {
    const { data: projects, error: projectsError } = await supabase
      .from('projects')
      .select('*')
      .order('"order"', { ascending: true });
    
    if (projectsError) {
      console.error('Projects Error:', projectsError);
    } else {
      console.log('Projects Count:', projects?.length || 0);
      console.log('Projects Data:', JSON.stringify(projects, null, 2));
    }
  } catch (err) {
    console.error('Projects Exception:', err);
  }
}

testFetch().then(() => {
  console.log('\n=== Test Complete ===');
  process.exit(0);
}).catch(err => {
  console.error('Test failed:', err);
  process.exit(1);
});
