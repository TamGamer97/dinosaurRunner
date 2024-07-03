import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'
    

// Create a single supabase client for interacting with your database
const supabase = createClient('https://prrddydlhgpwoymzwmmu.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBycmRkeWRsaGdwd295bXp3bW11Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjAwMjQ2NTEsImV4cCI6MjAzNTYwMDY1MX0.ZaDsetgGjuDlAqWP-hjFLlXayNowkUhiUA-gL01GfHI')



async function getData(table)
{
    console.log('Fetching data: ' + table)
    const { data, error } = await supabase
        .from(table) // table
        .select() // collumn
        if(error)
        {
            console.log(error)
        }
        if(data)
        {
            return data
        }
}

async function sendScoreToDB(name, score)
{
    const { data, error } = await supabase
        .from('Leaderboard') // table
        .insert([{'name': name, 'score':score}]) // collumn
        .select() // needed or else data is not returned, but insertion still works
        if(error)
        {
            console.log(error)
            return 'error'
        }
        if(data)
        {
            return 'done'
        }
}
window.sendScoreToDB = sendScoreToDB


function initLeaderboardData()
{
    getData('Leaderboard')
        .then(data => {
            populateLeaderboard(data)
        })
}

window.initLeaderboardData = initLeaderboardData

function loginSystem(pass)
{
    if(pass == '123')
    {
        return true
    }else{
        return false
    }
}

window.loginSystem = loginSystem

async function resultLeaderboardDB()
{
    console.log('Deleting All Rows')
    const { data, error } = await supabase
        .from('Leaderboard') // table
        .delete()
        .neq('id', -1)
        if(error)
        {
            console.log(error)
        }
        if(data)
        {
            console.log('Deleted all rows')
            return data
        }
}

window.resultLeaderboardDB = resultLeaderboardDB