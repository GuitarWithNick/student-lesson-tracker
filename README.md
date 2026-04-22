# Student Lesson Tracker (Desktop Web)

Standalone browser app for tracking:

1. Students
2. Each student's goals
3. Songs learned
4. Practice material assigned
5. Organization by day (Monday-Thursday) or by name
6. Checkboxes for material that has been given
7. Custom material per student and system-wide material controls

## Run

Open `index.html` in a browser.

No build step is required.

## Official workflow

Use the Netlify-hosted URL as the main version of the app on all of your computers.

- Use the hosted Netlify URL for normal day-to-day use.
- Avoid opening older copied local versions unless you are intentionally testing something.
- Student data syncs through Supabase.
- App updates sync through GitHub + Netlify when new code is pushed to `main`.
- Local `file://` previews no longer auto-sync to cloud by default. That is intentional protection.
- If we ever need a controlled recovery from a local file, open it with `?allowLocalSync=1`.

## Publishing updates

This folder is intended to be the local working copy for:

- GitHub repo: `GuitarWithNick/student-lesson-tracker`
- Netlify site: Student Lesson Tracker

Recommended update flow:

1. Make changes in this folder.
2. Commit the changes in this folder's git repo.
3. Push to `main`.
4. Netlify deploys the new version automatically.
5. Refresh the hosted app URL on your other computers.

This repo includes `netlify.toml`, so Netlify should publish the repo root automatically.

### Quick publish checklist

Use this every time we want the hosted app updated:

- Confirm you're editing the tracked repo folder: `student-tracker-app`
- Check the current repo status:
  `git status --short --branch`
- Commit the changes:
  `git add . && git commit -m "Describe the update"`
- Push to GitHub:
  `git push origin main`
- Wait for Netlify to finish deploying
- Refresh the hosted app URL on your laptop and other computers
- Confirm the header version badge changed to the new build number

If a push ever fails on this Mac, GitHub may be asking for the personal access token again.

## Local data

Local cache key:

- `student-practice-tracker-v1`

## Backups

Use the **Backups** panel in Admin Tools for manual recovery points.

- `Export Full Backup` downloads the full tracker as JSON.
- `Import Backup` restores a saved backup JSON into the current browser and syncs it back to cloud.
- Automatic local snapshots are saved before every cloud write on each browser.
- The app now keeps the most recent `40` automatic snapshots per browser instead of only a handful.
- `Download Latest Auto Backup` lets you pull the newest automatic snapshot from the current browser.

## Spreadsheet Import

Use the **Import Spreadsheet** panel in the app.

- Supported files: `.csv` and `.tsv`
- Template file: `material-import-template.csv`
- Example from your inventory categories: `lesson-inventory-from-sheet-example.csv`
- If your file comes from Apple Numbers, export it first:
  `File > Export To > CSV`

Supported columns:

- `type` = `material`, `goal`, or `song`
- `scope` = `global` or `student` (used for `material` rows)
- `category` = grouping label (for example `Songs`, `Arpeggios`, `Chords`, `Theory`)
- `student` = student name (required for `goal`, `song`, and student material)
- `day` = Monday/Tuesday/Wednesday/Thursday (used when creating new students)
- `item` = material/goal/song text
- `given` = `true`/`false` (optional check mark status)
- `goal` and `song` optional helper columns if you prefer separate fields

## Cloud sync (shared with Android app)

This app can sync with the Android app through Supabase so both devices share the same data.

1. Create a Supabase project.
2. Run SQL from:
   - `../student-tracker-sync/supabase-setup.sql`
3. Copy your Supabase project URL and anon key.
4. Update this file:
   - `sync.config.js`
5. Use the exact same values in Android file:
   - `../student-tracker-android/sync.config.js`

Both files must share the same:

- `supabaseUrl`
- `supabaseAnonKey`
- `studioId`

After that, both apps auto-sync and also provide a **Sync Now** button.

## Security note

Right now this setup uses a publishable Supabase key in the client app, which is normal, but the
underlying database rules should be tightened if you want stronger protection.

Recommended next hardening steps:

1. Make the GitHub repo private if you do not want the project files publicly visible.
2. Re-enable Supabase Row Level Security and add a policy for your tracker data.
3. Keep using the hosted Netlify URL as the single shared version of the app.
