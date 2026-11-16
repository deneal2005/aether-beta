# Fastlane workspace exploration

Observed in the authenticated Rent Mate workspace on 16 November 2026. This document records screens and behavior visible in the signed-in session. It does not assume behavior for screens that were not opened.

## Workspace shell

- Dark interface with a near-black dotted background, Geist-style typography, compact gray labels and an orange accent close to `#F0A019`.
- Persistent left sidebar: workspace selector; Home, Campaigns, Studio, Brand, Competitor Radar, Analytics and Warmed accounts; Senna chat shortcut; credit/trial card; See plans; version notice; account menu.
- The Rent Mate workspace selector opens a workspace list and offers New workspace. The create action was not used.
- The credit card shows 0 credits and 0% used after the campaign generation described below. See plans opens plan and credit choices.
- The account menu contains Settings, Refer and earn, Support, appearance controls and Sign out. Sign out and preference changes were not used.
- The “New version ready” notice has Later and Refresh controls. Later is dismissible; Refresh reloads the app.

## Onboarding flow

The inspected onboarding sequence asked for a first name, role, buyer type, up to three goals, discovery source and current ad activity, then showed a brand review, competitor review and a first-post queue.

1. **Personal setup:** First name was Deneal. Role was Founder. Buyer type was Both. The goal response was “any”; More bookings was chosen as the primary goal. “How did you hear about us?” was Other. Paid ads was No.
2. **Brand review:** Site scan showed `rent-mate-beryl.vercel.app`, 11 pages and 2 products; colors `#F0A019` and `#15233B`. Pages included Home, How it works, Browse and Safety. Products were Rent Mate and Verification membership. The brand review showed India and Calcutta time, five buyer segments (30%, 20%, 18%, 17%, 15%), positioning around legitimate and protected companionship, safety controls and pay-per-meet bookings. Optional price points shown were Silver ₹299/month, Gold ₹699/month and Platinum ₹1,499/month. Brand, buyer, positioning and product editors were inspected without changing their values.
3. **Competitors:** Fastlane proposed 12 names; all were kept: Rent a Friend, Bumble, Meetup, Kumpanio, QuickPartner, MeetReal, LetMeBuddy, HireApartner, RentalFriend, Hire-a-Friend, Rent Him and KoPartner.
4. **First posts:** The first queue included “When you want to go to the concert, but nobody’s free” (video), “You wanted to go to the concert. The plan was never the problem” (video), “4 low-pressure ways to rebuild your social confidence” (slideshow), a cancelled-plans meme and “The plans you keep skipping because you’d have to go alone.” The first two videos and slideshow were kept; the meme and going-alone post were skipped. The later swipe queue had no free keeps left and showed a See plans option. The post editor and asset, prompt, text and overlay controls were reviewed without uploading or regenerating assets.

## Campaigns and calendar

- Campaigns shows the goal “Fill more pay-per-meet companionship bookings from people seeking company,” running/planned counts, persona access, Campaigns and Calendar tabs, and a Plan a campaign action.
- The Starter campaign is Draft/Planned: 3 of 28 posts created, 25 drafts, organic-only, four weeks, one post per day. It says an account must be connected before posts can go out; posts can still be made and downloaded from Library.
- The campaign persona is “People earning through companionship”: adults offering companion services on their own schedule and setting rates. Needs, safety and payout barriers, booking journey and six strategy angles are shown.
- The November 2026 calendar shows daily 18:00 Calcutta posting times. The campaign has not started; dates show where posts would land if started. The first three generated dates are November 17–19; later dates are drafts. Clicking a date opens its time, title, angle, caption and status, with Edit caption and Open post actions.
- Campaign detail has Review and All posts 28 views, a post selector, Previous/Next, Details, Skip (nothing charged), Swap, Edit, and a Make action with a credit cost. It also has About this campaign, persona, Configure, Connect accounts to launch and Your credits panels.
- All posts is arranged as four weekly groups of seven, each priced at 35 credits. Angles and their planned post counts are listed. The credit panel showed 0 available, 3/28 made, 25 drafts and 125 credits needed; nothing is made until Make, and Launch asks for confirmation.
- Configure opens a panel for campaign name, posting pace, duration, timezone, accounts, angles, ads and persona. The inspected values were one month, daily, India Standard Time (Kolkata), no connected account and no ads. No changes were saved.
- The separate **Plan a campaign** wizard has five steps: choose at least five angles; choose organic, ads or both; choose up to five accounts (none connected, with TikTok and one account as the default); select formats, weeks and posting pace; review and name the campaign. I reached the review screen and left “Add to strategy” untouched because it would add a second campaign to the live workspace. No campaign was launched.

## Home and chat

- Home has the “What should Senna make for Rent Mate?” composer, Make without asking switch, Image/Video/Script/Campaign chips, attachment control and send action. It says the price is shown before making content.
- Next up showed two items: posts paused because the account had no credits, and Starter campaign waiting for an account. Recent creations showed the three kept posts. Other shelves link to formats, campaigns/ads/calendar, competitor remixes and trends.
- New chat opens “What are we working on?” with the same composer controls and suggested prompts for an image, video, script, campaign, new angles and performance questions. The Your work panel shows the three saved posts. No message was sent.

## Studio

- Tabs: Overview, Create, Library, Blitz and Influencers.
- **Overview:** composer and credit count; 46 video formats and 21 static formats; recent creations; competitor remixes; trending posts and template trends.
- **Create:** Video/Static filters, All/Ready for Rent Mate/Needs something filters and search. Format groups include text-over-clip, person-on-camera, animated stories and built-from-footage. Selecting a format opens an example, a brief field, its credit cost and generation controls. Generation was not run.
- **Library:** format and status filters, search, Select to ship, media filters (Images, Clips, Hook clips, Audio), Upload, curated slideshow sets and an inspiration shelf. The three generated posts appeared here. No upload or shipping action was used.
- **Blitz:** daily suggestions, Why this content, Reject, Edit, Approve and Configure Blitz. The page says daily suggestions are free to review, each keep/skip uses the daily review allowance, and keeping costs 5 credits. Configure Blitz shows strategy angles, voice choices, media sources, 25% format mix and smart text positioning. No suggestion was approved or rejected.
- **Influencers:** an empty state and New influencer. The wizard begins with Generate base image, Upload own or Pick from gallery, then name and character details. It showed 4 credits for a base image and 984 credits for an influencer. No creation was attempted.

## Brand, Radar and Analytics

- **Brand** tabs: Profile, Products, Competitors, Demo videos and Photos/videos. Profile shows website scan, colors, India/Calcutta timezone, positioning and audience. Products shows Rent Mate from ₹299/month and the Verification membership without a price. Competitors shows the 12 kept brands. Demo videos accepts MP4/MOV up to 100 MB and 30 seconds. Photos/videos accepts images and video with size and length limits. Editors and upload buttons were inspected without changing data or uploading files.
- **Competitor Radar** showed search, filters, keyword chips (for example “new friends,” “join local,” and “local groups”), 10 of 52 ads from 4 brands, competitor filters and example ad cards with Remix actions. More than 100 ads is a paid feature. No remix was run.
- **Analytics** switches between Paid ads and Organic posts. Both views showed example metrics and asked for an account connection to show real results. No account was connected.

## Warmed accounts

The free-trial gate describes buying an account, setting its handle, bio, picture, country and niche, then warming it on a real device and reviewing posts before they go out. Displayed pricing was $100/month plus $1.50/post. The “Questions” drawer contained 11 FAQ entries; all were opened:

- **Pricing:** $100/month for account creation, warm up, hosting and ongoing management; $1.50 per post for real people to post videos. It says there are no other setup fees.
- **Using the account:** it will be integrated into Fastlane automatically and visible in Settings → Integrations.
- **People and devices:** Fastlane says each account is created on a real phone with a local SIM and managed by a local person; no bots, emulators or phone farms. Posts are made natively by people.
- **Timing:** most accounts are ready for initial review in a couple of days. There is a three-day period to request changes; approval in Fastlane is required before posting, followed by more warming days.
- **Ownership and credentials:** the FAQ says the customer owns the account, but login credentials are withheld while Fastlane operates it to preserve geo-targeting; they are provided if the customer stops the service or wants manual management.
- **Warming and account issues:** a person scrolls, watches, likes and follows in the niche on a real phone. The FAQ says bans are rare and an account is replaced at no extra cost if one occurs.
- **Countries/platforms/content:** listed countries are United States, United Kingdom, France, Spain, Switzerland, Italy, Australia, Canada, Mexico, Brazil, Colombia, Romania and Sweden. Supported platforms are TikTok and Instagram. Supported examples are TikTok videos and slideshows, Instagram Reels and carousels.

The offer for $20 off the first month was dismissed with No thanks. No plan or account was purchased.

## Settings

Settings categories were Account; Workspaces, Members, Plan and spend, Activity; What runs without you, Post choices, Post labels, Notifications, Language; Integrations and API; plus Tour replay.

- **Account:** name, email, photo and password controls; appearance; timezone (Calcutta) and region (India); ad attribution; delete-account control. Personal account details were not copied here or changed.
- **Workspaces/Members:** 1 of 3 workspaces and one owner. Rename/delete, invite and member controls were visible; none were used.
- **Plan and spend:** trial, 0 credits, plan tiers, storage use and credit purchase/plan controls. No purchase was made.
- **Activity:** campaign plan and the three saved posts. The record said the starter campaign is templated, posts wait for a linked channel, and the trial balance moved from 50 to 15 credits before three 5-credit posts were created.
- **What runs without you:** per-make and daily credit caps, platform auto-post controls (all “Asks first”). **Post choices:** who appears, brand and influencer frequency, caption style and text style. **Post labels:** platform AI-disclosure behavior and warmed-account ad disclosure. **Notifications:** workspace and personal notification options. **Language:** English. These were reviewed without changing settings.
- **Integrations:** 0/10 connected; TikTok, Instagram, YouTube, LinkedIn and Meta options; website-visit measurement and account-history controls. No account was connected and no toggle changed.
- **API:** not opened because an authenticated API page could expose account credentials. Tour replay was available.

## Visual and interaction notes

The app uses a compact fixed sidebar and a broad dotted workspace canvas. Screens use dark panels with thin gray borders, rounded cards, small uppercase section labels, orange highlights and white primary actions. Modals, drawers, accordions, tabs, dropdowns, checkboxes, campaign cards, calendar entries, filters and wizard steps provide the main interaction patterns. The local clone uses the same shell and representative interactions with Rent Mate demo data.

## Actions and blockers

- The user asked to keep three initial posts. Fastlane created the Starter campaign and consumed 15 credits; the balance is now 0. No social account was connected and nothing was published.
- The campaign planner was left at its review screen to avoid adding a second live campaign. Paid plan/account actions and social-account authorization were not taken.
- Fastlane content generation, account connections, posting, purchases and real file uploads are not implemented in the local clone. Its screens and buttons are local-only previews; this clone does not send data to Fastlane.
