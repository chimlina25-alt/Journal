const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(
  'https://jyliondvdlpqrrcbpaob.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imp5bGlvbmR2ZGxwcXJyY2JwYW9iIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzIyNjg3MzUsImV4cCI6MjA4Nzg0NDczNX0._FADiggvw7IvtccKRvcG1kf5YdvaxVkq3UxilW3W7l0'
);

async function run() {
  const email = 'testuser_' + Date.now() + '@gmail.com';
  const password = 'password123';
  const fullName = 'Test Full Name';

  console.log('Signing up...');
  const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        full_name: fullName,
        fullName: fullName,
        name: fullName,
      }
    }
  });

  if (signUpError) {
    console.error('Sign up error:', signUpError);
    return;
  }
  
  console.log('Sign up data user_metadata:', signUpData.user.user_metadata);

  console.log('Signing out...');
  await supabase.auth.signOut();

  console.log('Signing in...');
  const { data: signInData, error: signInError } = await supabase.auth.signInWithPassword({
    email,
    password
  });

  if (signInError) {
    console.error('Sign in error:', signInError);
    return;
  }

  console.log('Sign in data user_metadata:', signInData.user.user_metadata);
}

run();
