// supabase.js
// هذا الملف خاص بالاتصال بقاعدة البيانات Supabase

const SUPABASE_URL = 'https://jzxlvwxekcrnqsfwxnny.supabase.co'
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imp6eGx2d3hla2NybnFzZnd4bm55Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzgxNTUxNzAsImV4cCI6MjA5MzczMTE3MH0.uDrBInXP3i8GvGxaNCQey-T3uDidUfeBsr6PUFFTJyQ'

let supabaseClient = null

function initSupabase() {
  if (typeof supabase !== 'undefined' && supabase.createClient) {
    supabaseClient = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY)
    console.log('Supabase connected 💗')
    return supabaseClient
  } else {
    console.log('Waiting for Supabase to load')
    return null
  }
}

async function loadAllMemories() {
  if (!supabaseClient) {
    const waitForClient = setInterval(() => {
      if (supabaseClient) {
        clearInterval(waitForClient)
        fetchMemories()
      }
    }, 100)
    return
  }
  
  try {
    const { data, error } = await supabaseClient
      .from('memories')
      .select('*')
      .order('created_at', { ascending: false })
    
    if (error) throw error
    return data
  } catch (err) {
    console.log('Error loading memories:', err)
    return []
  }
}

async function addNewMemory(memoryText, memoryEmoji, memoryDate, writerName) {
  if (!supabaseClient) return null
  
  try {
    const { data, error } = await supabaseClient
      .from('memories')
      .insert([
        {
          memory_text: memoryText,
          memory_emoji: memoryEmoji || '💗',
          memory_date: memoryDate || '2026',
          writer_name: writerName || 'زائر'
        }
      ])
      .select()
    
    if (error) throw error
    return data
  } catch (err) {
    console.log('Error adding memory:', err)
    return null
  }
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { initSupabase, loadAllMemories, addNewMemory }
}