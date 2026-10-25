/* Study notes per lesson, paraphrased from the HCM Core course books (B1 = HCM Core for Administrators, B2 = HCM Core Supplemental, 25R2) and the Workday pages listed under Sources.
   Each lesson: [heading, book pages, [bullets]]. A bullet written "Term|text" shows the term in bold. */
const N={
'job-families':[
['The job catalog','B1 pp. 157, 159',[
'Job Catalog|The structure of job family groups, job families, and job profiles that defines the jobs and positions in your organization. Define profiles before you fill jobs or positions.',
'Job Catalog report|A delivered report that shows family groups, families, and profiles together in one view.',
'Optional layers|Job families and family groups are optional. They make profiles easier to find, report on, and maintain.',
'Relationships|A profile can belong to one or more families. A family can belong to a family group.']],
['Where job families are used','B1 pp. 159, 189 · B2 p. 151',[
'Prompts and reports|Families and family groups show up as filters when you pick a job profile or build job-profile reports.',
'Workday Recruiting|Families and family groups appear on career sites as job or position categories, so pick names candidates understand.',
'Rules|You can use families as criteria in condition rules and compensation eligibility rules.',
'Hiring restrictions|A Job Family restriction limits the job profiles you can pick to the ones in that family.',
'Security|Job-based security groups can use job family as their membership criterion.']],
['Watch out','B1 pp. 159, 162–163',[
'New profile, existing rule|If a compensation eligibility rule uses a family, add every new profile to that family. Otherwise the package will not default when someone is hired into the profile.',
'Doing it|Create Job Family, then choose the family in the Job Family field on each job profile. Check membership with the Job Family report.']]],

'job-profiles':[
['What a job profile is','B1 pp. 55, 157–158',[
'Definition|A generic description of a job: title, description, qualifications, compensation, and other characteristics. Jobs and positions are created from profiles.',
'Every worker has one|Every worker hired or contracted must have a job profile.',
'Reuse|One profile can back one position (a CEO) or many (an Executive Assistant profile used in Sales, Finance, and IT).',
'Used widely|Recruiting, Compensation, and Talent all use job profiles, not just HCM.']],
['Fields','B1 pp. 158–161',[
'Required|Only Job Profile Name, Job Code, and the effective date are required.',
'Optional|Job Title Default, Restrict to Country, Management Level, Job Level, Job Classification, Job Family, Company Insider Type, Qualifications (education, skills, experience, certifications), Union Membership, Work Shift Required, Include Job Code in Name, Job Exempt, Job Category, Pay Rate Types, Referral Payment Plan, Compensation Grade and Grade Profile, Questionnaires, Metrics (difficult to fill or critical), and Job Description.',
'Customer-defined values|Values such as management level and job classification are set up by your organization.']],
['Key settings','B1 pp. 160–161',[
'Automatic job codes|Set an ID Definition for Job Code in the ID Sequence Generator section of Edit Tenant Setup - HCM. The field stops being required and Workday creates the code when you save. You can still type over it.',
'Restrict to Country|Limits the profile to the countries you pick; leave it blank to allow all. It helps managers choose a valid profile in Change Job.',
'Management level|A customer-defined ladder (for example CEO, Vice President, Director, Manager, Individual Contributor) loaded at deployment and set up in Edit Tenant Setup - HCM. Used in reporting, condition rules, eligibility rules, and approval routing.',
'Compensation grade|Workday recommends a grade on each profile so pay defaults. The Impacted Eligibility Rules field lists rules that use the profile.']],
['At hire','B1 pp. 161, 190, 288',[
'Defaults from the profile|Management level, job classification, company insider types, and work shift.',
'Position beats profile|If a value exists on both the position and the profile, Workday uses the position value because it is more specific.',
'Tip|Put worker-related data such as pay rate type on the profile. Other areas, like pay group or compensation eligibility, can use it.']]],

'job-management':[
['How Job Management works','B1 pp. 116–118, 194',[
'Restrictions on the organization|Set once with the Hiring Restrictions business process. They apply to every job in the supervisory organization.',
'No limit|You can hire, contract, or transfer in as many workers as meet the restrictions. This favors speed and high volume.',
'When a worker leaves|The job ends. Nothing stays open in the organization.',
'Reporting|Current headcount only. Control comes from the hire, contract, and transfer workflows.']],
['Hiring restriction fields (both models)','B1 pp. 119, 189',[
'Job Family|Only profiles in the family can be chosen.',
'Job Profile|Limits the profiles; with one profile, it cannot be changed at hire.',
'Location|Limits locations; with one location, it cannot be changed at hire.',
'Worker Type|Employee or contingent worker. Choosing Employee removes Contract Contingent Worker.',
'Worker Sub Type|A tenant list such as regular, casual, fixed term, seasonal, or intern. Pick a Worker Type first.',
'Time Type|Full time, part time, or variable.',
'No Job Restrictions|Allows any combination. You must pick at least one restriction or this box; Availability Date and Earliest Hire Date are always required.']],
['Enforcement and overrides','B1 pp. 119, 187, 189',[
'Where enforced|Hire, Contract Contingent Worker, and Change Job. The job profile restriction is also enforced on transfers.',
'Not enforced|Edit Position, and corrections to completed events.',
'Override setting|Edit Tenant Setup - HCM > Staffing > Allow Override of Restrictions on Staffing Events. Restriction values still default, but users can pick other values.']],
['Changing the setup','B1 pp. 119–120, 199',[
'Edit Hiring Restrictions|Changes restrictions for future hires only.',
'Edit Job|Changes the current worker\'s job details (job profile, worker type, time type, location, classifications, work shift).',
'Edit Staffing Model|From the organization\'s Related Actions > Organization. Available only until restrictions are set or positions are created.',
'Maintain Staffing Models|Lists organizations whose model can still change and lets you edit up to 100 at a time.']]],

'position-management':[
['How Position Management works','B1 pp. 116–118',[
'Open position required|You need an open, approved position to hire, promote, demote, or transfer a worker into the organization.',
'Per-position rules|Each position has its own restrictions.',
'Positions stay open|A position stays open until it is filled or closed by hand, and it can move to another organization in a job change or reorganization.',
'Reporting|Open and filled positions, position history, and time to fill.']],
['Create Position','B1 pp. 182, 190–192',[
'Required fields|Job Posting Title, Number of Positions, Availability Date, and Earliest Hire Date.',
'Restrictions|Pick at least one restriction or select No Job Restrictions.',
'Number of Positions|Creates several identical positions; Workday adds a number to each title.',
'Position Request Reason|Why the position is created; the reasons are customer-defined.',
'Approvals|Create Position is a business process, so you can require approvals. Hire appears in the organization\'s Related Actions only once a position exists.']],
['Changing positions','B1 pp. 199, 206–207',[
'Edit Position Restrictions|Changes restrictions for future hires, not the current incumbent.',
'Edit Position|Changes the incumbent\'s details, such as job profile, worker type, time type, location, classifications, and work shift.']],
['Job requisitions','B1 pp. 199–202',[
'When required|Required if you use Workday Recruiting. Otherwise they are optional.',
'Position Management settings|Edit Tenant Setup - HCM: require requisitions for all Position Management staffing events, require them based on rules, or neither.',
'What defaults|Qualifications, education, and competencies come from the job profile. Restrictions can default from the most recent filled position or from the position restriction.',
'Organization defaults|Enable Organization Defaults on Create Job Requisition pulls company and cost center from the supervisory organization.']]],

'staffing-processes':[
['Business process terms','B1 pp. 179–180',[
'Business process type|A kind of workflow Workday delivers, such as Hire or Termination.',
'Definition|Your configuration of a type, such as Hire for Global Support.',
'Event|One run of a definition, such as Hire: Logan McNeil.',
'Step|A task, subprocess, or action that a user or Workday completes.',
'Initiator and target|The initiator starts the process; the target is its subject, such as the new hire.']],
['Running Hire','B1 pp. 183, 288–289',[
'Pre-hire|Start from an existing pre-hire record or create a new one.',
'Required|Hire date, position, employee type, job profile, time type, and location.',
'Defaults|Weekly hours from the location; management level, job classification, company insider types, and work shift from the job profile; first day of work and continuous service date from the hire date.',
'Service dates|Add the Service Dates Change subprocess and set rules in Maintain Staffing Field Defaults to fill service dates automatically.',
'Propose Compensation Hire|The subprocess that defaults packages, grades, and plans for the new hire.']],
['Finding and fixing events','B1 pp. 184–188',[
'Find an event|Search with event:, use the My Tasks Archive (last 90 days), the worker\'s history, or the Find Events report.',
'Event Related Actions|View Definition (which definition ran), Full Process Record (every step and notification), Test Rule, and Report Fields and Values.',
'Correct|Administrative, needs no approval but requires a comment. Works on in-progress or completed events, and needs Correct permission on the BP policy.',
'Cancel|For in-progress events; groups with permission and the initiator can cancel.',
'Rescind|For Successfully Completed events; groups with permission can rescind.']],
['Corrections in date order','B1 pp. 186–187, 289–290',[
'Out-of-order corrections|Allowed for most staffing events if the change does not affect the worker\'s organization or position. A corrected date must stay between the previous and next events.',
'Not re-checked|Correcting a completed event does not re-validate it against hiring restrictions, and Workday does not fix later events for you.',
'Hire date conflicts|Use View Hire or Contract Start Date Correction Conflicts from the event\'s Related Actions.',
'Supervisory org on Hire|Both organizations must use the same staffing model. Moving it can leave unassigned tasks; reassign them with Mass Operation Management.']]],

'change-job':[
['Two ways to start','B2 pp. 116–120',[
'Start Job Change|For managers. Asks simple questions based on a change job template.',
'Transfer, Promote or Change Job|For administrators. A Start page, then a guided editor that walks through each section. Sections are secured by domain.',
'Where to start|The search box, the worker\'s Related Actions > Job Change, or the My Team Management dashboard.',
'Security|To let managers use Start Job Change, add the Start Job Change initiating action to the Change Job BP policy.']],
['Change job templates','B2 pp. 117–119',[
'Maintain Change Job Templates|Sets the fields, sections, subprocesses, reasons, and help text for templates on Change Job, Change Location, Request Transfer, and Change Contingent Worker Details.',
'Reasons|With several reasons on a template, users see "Why are you making this change?". Without them, managers see "What do you want to do?" and choose a template.',
'Review steps|Apply Template for Review/Approve Steps shows reviewers the same simplified page.',
'Worker profile|The first five templates appear as buttons on the Start Job Change card; condition rules control which templates a group can pick.']],
['Teams, new orgs, and reasons','B2 pp. 121, 126',[
'Move Team|Move all eligible teams with the manager or leave all behind. Teams with future-dated changes are ineligible.',
'Assign Superior|After Change Job completes, each team moves through its own Assign Superior subprocess, which you can cancel, rescind, or correct.',
'New supervisory org|Add the Create Subordinate subprocess with a condition rule and an HR role.',
'Event reasons|Maintain Event Categories and Reasons maps your reasons to Transfer, Promotion, Lateral Move, Demotion, and Data Change. Keep the list short.',
'Micro-tasks|Change Location, Change Contractor Details, and Request Transfer show only the fields needed.']],
['Roles and consolidated templates','B2 pp. 124–129',[
'Assign Roles - Change Assignments for Worker|Shows a Summary of Changes (position, manager, supervisory organization, location) and lets you transfer, copy, or remove roles, or change nothing.',
'Rescinding|Rescinding Change Job does not rescind the role changes.',
'Consolidated template|Change Job can combine Assign Employee Collective Agreement, Change Organization Assignments for Worker, and Propose Compensation Change on one screen. Configure it from View Business Process Template > Configure Consolidated Template.',
'Help text|Instructional text (template tab), section group help (Section Groups tab), and step help text (the step\'s Related Actions).',
'Job Management moves|"Change Job Use Default Orgs for Job Management" in Edit Tenant Setup - HCM controls how positions and org assignments behave in moves.']]],

'termination':[
['Starting a termination','B2 pp. 74–77',[
'Terminate Employee|From the worker\'s Related Actions > Job Change > Terminate Employee, or search for the task.',
'Submit Resignation|Workers report their own resignation (Job Change > Resign). It links to Termination through the Review Worker Initiated Termination step. Timely reporting avoids overpaying and lingering system access.',
'Severance|A Severance Matrix sets default notice and pay; the Severance Package and the Severance Worksheet business process (review, send back, approve) feed the termination and payroll.',
'Guided editor|Sections are Reason, Notice Period, Details, Regrettable, Eligibility, and Position Details. Each is secured by domain and can be hidden from some groups.']],
['Dates and reasons','B2 pp. 77–80',[
'Termination date|The last day of employment. The worker is terminated just after midnight in their own time zone, so a London worker shows as terminated five hours before a New York worker.',
'Defaults|Last Day of Work and Pay Through Date default to the termination date and can be edited. Resignation Date is entered by the worker. Notify By uses the country\'s minimum notice.',
'Reasons|Maintain Termination Categories holds your reasons, grouped into categories, with Involuntary, Retirement, Inactive, and Manager Reason flags. Use Maintain Local Termination Reasons for country rules.',
'Notice periods|Calculate a proposed termination date for voluntary and involuntary terminations. Rules can use milestones such as probation end or length of service.']],
['Cleaning up','B2 pp. 80–82',[
'Manage Business Processes for Worker|Shows tasks assigned to the worker (cancel or reassign), processes about the worker, and delegations. It can be an Action step in Change Job, Terminate Employee, End Contingent Worker Contract, and Request Leave of Absence.',
'Assign Roles|Transfer, copy, or remove the leaver\'s roles. The task shows a summary of the parent\'s changes.',
'System access|Edit Workday Account (expiration date or Account Disable), or a Terminate User Account service step set to the termination date or last day worked.']],
['Job overlap, No Show, and security','B2 pp. 87–94',[
'Job overlap|Two workers share a position for a time, for training or leave cover. Enable it in Edit Tenant Setup - HCM. Only for Position Management, and not when the position is closing, moving in Change Job, or already overlapped.',
'Overlap effects|The overlap worker shares the position\'s roles, including Manager, so steps route to both. Org assignments are not synced. Headcount and FTE reports are affected.',
'No Show|For a hire who never starts. Removes them from headcount and can avoid a day of pay. Run the No Show Event Detail report to list them.',
'Correct, don\'t rescind|Correcting a termination keeps the data; rescinding means re-entering everything.',
'Template security|Use the template\'s Task Security tab and the Template-Driven Business Process Security report to check both BP and domain permissions.']]],

'compensation':[
['The building blocks','B1 pp. 124–125, 134–135',[
'Compensation package|Groups grades and plans and uses eligibility rules to decide who gets it.',
'Grade|Pay range guidance for a job or level.',
'Grade profile|A localized range for a grade, for example by country and currency.',
'Plans|Salary, hourly, period salary, and unit salary for base pay; allowance plans for extra pay.',
'Compensation element|Links a plan to a payroll earning. Base pay, car allowance, and commission are examples.']],
['Eligibility rules','B1 pp. 126–132',[
'What they check|About 50 delivered fields, such as job profile, job family, organization, organization and superior organizations, location, employee type, exempt status, and management level.',
'Logic|A rule can mix AND and OR conditions. Two rules on one component use OR.',
'Testing|Test Compensation Eligibility Rule checks one event. Employee Compensation Audit shows who is eligible but unassigned, or assigned but ineligible.',
'Performance|Use fields with few instances, and put the conditions that exclude the most workers first.']],
['Grades and plans','B1 pp. 132–134, 143–146',[
'Grade ranges|A minimum, midpoint, and 3, 4, or 5 segments. A salary outside the range gives a warning, not an error.',
'Common practice|Leave the grade\'s default range at zero and set real ranges on each grade profile.',
'Salary plans|Most tenants need one salary plan. Apply FTE% options and Exclude from Merit are the main settings.',
'Allowance plans|Amount, percent, or unit based. Reimbursable needs Workday Expenses. No Override stops editing at the employee level.']],
['How pay defaults','B1 pp. 127–128, 149, 152',[
'Defaulting sources|Eligibility rules, the grade on the job profile, default compensation on the position, the job requisition, or the offer.',
'Rules|Eligible for one package, its grade, and a plan in it: defaults. Plan not in the package: selectable only. Eligible for two packages or grades: nothing defaults.',
'Compensation events|Propose Compensation Hire (Hire, Add Additional Job, Start International Assignment), Propose Compensation Change (Change Job), and Propose Compensation Offer (Recruiting).',
'Ad hoc changes|Request Compensation Change and Request Grade Change from the worker\'s Related Actions > Compensation.']]],

'organization-types':[
['Organization types','B1 pp. 62–65, 101–103',[
'Supervisory|Groups workers into the management hierarchy and holds positions and job restrictions. Hiring a worker into one assigns their manager.',
'Matrix|A dotted-line manager relationship. Workers can be in several; creating or changing one needs no reorganization event.',
'Company|A legal entity tied to financial transactions. Use a separate company for each entity with its own tax ID. The base currency cannot change after the first transaction.',
'Cost center|Tracks revenue and expense, plus HCM transactions with financial impact. Guideline: it has a manager, a financial impact, and a budget.',
'Region|An area of responsibility, not a physical place.',
'Location|A physical work location; also used to track assets.',
'Pay group|Workers with the same payroll rules. Workday Payroll workers in the US, Canada, and France belong to exactly one, unless they have multiple jobs.',
'Custom|For needs the delivered types do not meet. Custom types cannot be subordinate to delivered types.']],
['Creating an organization','B1 pp. 65–68, 91',[
'Fields|Availability Date (when it appears in prompts), Name, Code, Subtype, Visibility, and Roles. Supervisory organizations add External URL, Primary Location (required), Staffing Model, and Identifiers.',
'Inherited|Subordinates inherit Visibility, Primary Location, Staffing Model, and Roles.',
'Subtypes|Customer-defined values such as division or department. A subtype hierarchy can force divisions to sit under departments; Allow for Skipping Levels relaxes it.',
'Maintain Organization Types|Sets whether a type is assigned to positions, its subtypes, and worktag options. Types fall into Costing, Hierarchy, HR, Pay, and Custom.']],
['Locations','B1 pp. 78–79',[
'Before supervisory orgs|You need at least one location, because Primary Location is required.',
'What they carry|Address, time profile (standard weekly hours), locale (date and currency formats), and time zone, which workers inherit.',
'Location usage|For example a business site, which can hold workers, time zones, work hours, and positions.',
'Recruiting touchpoint|Candidates may see location names, so make them clear.']],
['Supervisory org changes','B1 pp. 67, 89–90',[
'Multiple managers|Several positions can hold the Manager role with equal abilities. Use Single Assignment to mark one as main for reports and integrations.',
'Assign Superior|Moves an organization under a different superior.',
'Create Subordinate|Creates a new subordinate that inherits the staffing model, assignments, and roles.',
'Divide Organization|Splits one organization in two, with less inheritance.',
'Inactivate Organization|First remove the positions (Position Management) or workers (Job Management).',
'Move Workers (By Organization)|Both organizations must use the same staffing model.']]],

'organization-hierarchies':[
['Hierarchy rules','B1 pp. 82–83, 103',[
'One type per hierarchy|Company hierarchies hold companies, cost center hierarchies hold cost centers, location hierarchies hold locations, and region hierarchies hold regions.',
'Many views|The same organization can be in several hierarchies, and hierarchies can contain other hierarchies.',
'Transactions|Recorded on the organizations, not the hierarchy. Costs roll up automatically.',
'Who assigns|The organization administrator or the hierarchy owner.']],
['Hierarchy types','B1 pp. 83–84',[
'Company hierarchy|Used for consolidated reporting. All companies in it need the same account set but can have different currencies.',
'Location hierarchy|Groups locations by geography, for example Europe > Northern Europe > London and Dublin.',
'Roles on hierarchies|HR Partner (by location) and Compensation Partner (by location) are assigned on location hierarchies, not on single locations. Assigning roles on a hierarchy lets them inherit.',
'Workers in a location hierarchy|They join by being hired or contracted with a location in the hierarchy.']],
['Reorganization events','B1 pp. 71, 90, 103',[
'Purpose|Groups reorganization activities under one effective date so you can track them.',
'What to group|Activities that are logically related and happen on the same date. Do not split one coherent change.',
'Routine moves|For periodic Move Workers activity, create one reorganization per period, dated at the start of the period.',
'Business processes|The reorganization event itself is not a business process, but the tasks in it are, so they can require approval and be cancelled or rescinded.',
'Tracking|Use the Reorganizations report.']],
['Building one','B1 pp. 85–88',[
'Create|Create Cost Center Hierarchy or Create Location Hierarchy: pick the reorganization, name, subtype, visibility, and roles. The Owner and Hierarchy Owner roles default in.',
'Fill|Reorganization > Assign Included Organizations (or Assign Locations for location hierarchies).',
'Check|Use the Org Chart or Navigate Hierarchy buttons.']]],

'organization-assignments':[
['Allowed and default','B1 pp. 97, 104',[
'Allowed Organizations|The values users can pick during staffing events. They also drive the Default prompt.',
'Default Organizations|The value that fills in automatically. You can enter only one default, but many allowed values.',
'Blank allowed list|Every value of that type can be assigned.',
'Automatic membership|Workers hired or transferred into the supervisory organization join its default organizations, such as company and cost center.']],
['Inheritance and overrides','B1 pp. 97, 99–100',[
'Subordinates inherit|A subordinate uses its superior\'s Default and Allowed values unless it has its own. Inherited from Superior shows this on the Organization Assignments tab.',
'Override|Entering a value on the subordinate replaces the inherited one.',
'Where to set|On the supervisory organization (Edit Supervisory Organization) or on an individual position. You can also edit them for one employee.']],
['Changing assignments','B1 pp. 97–98, 183, 266',[
'Change Organization Assignments for Worker|A template-driven business process that changes assignments for a worker or a position. Each organization type is secured by its own domain.',
'In Hire|Commonly added as a subprocess so assignments default and can be adjusted.',
'Location hierarchy assignments|A location hierarchy can also restrict values. The prompt shows only values both the hierarchy and the supervisory organization allow.']]],

'assignable-roles':[
['How roles work','B1 pp. 66–67, 225',[
'Assigned to the chair|A role attaches to a position or job, not the person. Whoever sits in the position has the role.',
'Every organization type|All organization types can have assignable roles.',
'Three sources|Inherited from the superior organization, assigned directly, or assigned by default.',
'What they drive|Security (role-based groups), business process routing, approvals, and notifications. One role can matter in many functional areas, so check with all teams.']],
['Maintain Assignable Roles fields','B1 pp. 226–230',[
'Required|Role Name, Enabled For, and Assigned by Security Groups.',
'Enabled For|The organization types the role works for. Use one type per role when possible.',
'Workday Role|Maps to a Workday role, such as Manager, used for worklets and reports.',
'Default Role|Another role that fills in when this one is unassigned.',
'Self-Assign|Gives the role to whoever creates the organization.',
'Restricted to Single Assignment|Only one position can hold it. Do not select it for Manager if you want multiple managers.',
'Hide on View if Not Assigned|Hides unassigned roles on audit reports. Do not hide roles used in routing.',
'Is Leader / Is Supporting|Leaders appear in org charts and in the organization name.',
'Assigned by Security Groups|Role maintainers who approve assignments for the organizations they support.']],
['Assigning roles','B1 pp. 230–231, 290',[
'From the organization|Related Actions > Roles > Assign Roles. Only Role Maintainers can do this, and no approvals run.',
'From the worker|Related Actions > Security Profile > Assign Roles - Add/Remove or Assign Roles - Change Assignments. If you are not a Role Maintainer, it routes to one for approval.',
'Other ways|On an unfilled position, as a business process step, or through a web service.',
'Reports|View Assignable Roles and Roles for Organization and Subordinates. The Set Up: Assignable Roles domain secures the role setup tasks.']]],

'bp-framework':[
['What a business process controls','B1 pp. 55–56, 179',[
'What|Tasks, actions, and subprocesses.',
'Who|Security groups.',
'When|The order of steps and the time frame.',
'Delivered vs configured|Workday delivers business process types. You configure definitions to meet your needs; you cannot add new types.']],
['A definition, tab by tab','B1 pp. 259–262',[
'Header|Effective date, the groups allowed to initiate, and a View Diagram button.',
'Business Process Steps|The steps and their order. Steps can run one after another or in parallel.',
'Notifications|System and custom notifications.',
'Allowed Actions by Role|Actions such as reviews and subprocesses.',
'Allowed Services|Services such as creating or resetting Workday accounts.',
'Related Links and Available Rules & Fields|External links, and the rules and fields you can use in conditions.']],
['Step columns','B1 pp. 261–262',[
'Order and If|Order sets the sequence; If shows conditions.',
'Type and Specify|The step type, and which task or subprocess it runs.',
'Optional|The user can skip it, but the next step waits until it is done or skipped.',
'Group and All|Groups come from the BP security policy; All requires every member to act.',
'Due Date|Shown to users but not enforced by Workday.',
'Complete|Marks the completion step, when data becomes available to other areas such as payroll.']],
['Planning and dates','B1 pp. 268–269, 280',[
'Business Process Configuration Options|Shows each type\'s valid organization types, allowed actions and approvals, subprocesses, restrictions, and allowed mass actions.',
'Definition effective date|When a change to the definition takes effect.',
'Event effective date|When the event\'s change, such as a raise, takes effect.',
'Which version runs|The one in effect on the initiation date.',
'Subprocesses|Have their own steps and definitions and follow the same ordering rules.']]],

'bp-definitions':[
['Default vs organization-specific','B1 pp. 283–284 · B2 pp. 16–18',[
'Default (recommended)|Easier to maintain. Many complex condition rules can slow processing.',
'Organization-specific|Cleaner and faster for complex flows, but common steps must be maintained in every copy, and testing the right copy is harder.',
'Copies|A copied definition can be edited on its own and linked to several organizations.',
'Which one runs|The initiating organization\'s definition, then its superiors\', then the default. Definitions with errors or that are inactive are skipped.',
'Check|Business Process Definitions for Business Object, from the organization\'s Related Actions.']],
['Rule-based definitions','B2 pp. 18–20, 129',[
'Better performance|The rule is evaluated once at initiation instead of at many steps.',
'Clearer history|Fewer skipped or rerouted steps make audits and troubleshooting easier.',
'Easier upkeep|Update one rule-based definition without affecting the others.',
'Use when|The same rule would be on 3 or more steps, or paths depend on who initiates or where workers are.',
'Tips|One condition rule per definition, and only fields that have a value at initiation.']],
['Edit mode vs View mode','B1 p. 269',[
'Edit mode|Add, change, or remove steps; set order, group, due date, and whether a step is optional.',
'View mode|Set the completion step and add condition rules, step delays, advanced routing, and step labels.']],
['Step configuration options','B1 pp. 270, 274',[
'Create Condition Rule|Saves a rule to the library without attaching it.',
'Maintain Step Conditions|Attaches a rule to the step.',
'Maintain Step Delay|Pauses before the next step runs.',
'Maintain Advanced Routing|Stops people from approving their own work.',
'Maintain Step Label Override and Help-Text|Changes how the step appears in My Tasks and adds instructions.',
'Set as Completion|Marks the completion step. Only one per process; approvals and reviews come before it.']]],

'bp-advanced':[
['Routing restrictions','B2 pp. 35–37',[
'Exclude Initiator|For example, someone who creates a supplier request should not approve it.',
'Exclude Prior Approvers|Someone who already approved compensation does not approve the whole event again.',
'Exclude Event Subject|An HR Partner being terminated does not review their own termination.',
'All excluded|If everyone assigned is excluded, the step is skipped.',
'Alternate routing|Optionally route to another group, relative to the transaction (such as the target\'s manager) or relative to the excluded user (such as the initiator\'s manager). You can also require only one user per group.']],
['Step delays and calendars','B2 pp. 38–39',[
'Step delay|Based on the prior step\'s completion, the initiation date, or a field such as Effective Date. Recalculate Delay on Correct keeps it accurate.',
'Order still applies|If step b waits 20 days, step c waits too.',
'Changing a delay|Reschedule Delayed Business Process Transactions.',
'Rule-based calendars|Set per business process type with condition rules (for example by country), so delays and due dates skip holidays. Otherwise the default calendar is used.']],
['Effective dates and time zones','B2 pp. 39–41',[
'Definition version|The version in effect when the event is initiated. Future-dated versions are not used.',
'Subprocesses|Use the version in effect when the parent started, unless Maintain Business Process Definition Selection says to use the subprocess\'s own initiation date.',
'Today\'s date|Changes take effect immediately everywhere. A future date takes effect at midnight in the chosen time zone.',
'Tenant time zone options|Workday default (Pacific), the tenant default time zone, or the event-related time zone (the target worker\'s, or the initiator\'s).']],
['Parallel steps','B2 pp. 30, 64',[
'Same letter|Steps with the same order letter run at the same time, in any order.',
'Next step|Starts only after all parallel steps finish.',
'Letters|Use letters, not numbers: Workday sorts alphabetically, so 10 sorts before 2. Insert steps with two letters, like ba between b and c.']]],

'bp-steps':[
['All step types','B1 pp. 263–265',[
'Initiation|Who can start the process. Always first and cannot be removed.',
'Action|A review (edit and approve) or a subprocess.',
'Approval|Approve, send back, or deny. No editing. A denial denies the whole process.',
'Approval Chain|Approvals up the management chain until the top or an exit condition.',
'Consolidated Approval / Chain|Several approvals for one worker in one task, alone or up the chain.',
'Mass Approval|A dashboard for many approvals in multi-organization processes such as merit.',
'Service|Starts a Workday-delivered service, such as Create Workday Account.',
'Integration|Sends data to or from an external system on its own processing thread.',
'To Do|An Inbox reminder for work in or outside Workday.',
'Others|Batch/Job, Checklist, Complete Questionnaire, Edit Additional Data, Report, Report Group, Review Documents, and Shared Participation.']],
['To Do steps','B1 pp. 266–267',[
'You create them|Workday delivers none; use Maintain To Dos.',
'Embedded tasks|A To Do can link to a Workday task in the Inbox, and can include SAML links.',
'Any group|To Dos can go to any active security group, even one not on the policy. If you link a task, make sure the group can open it.',
'Find them|The To Dos report shows which processes use which To Dos.']],
['Approvals','B2 pp. 29, 49–50',[
'No editing|Approvers cannot change data. Use an Action: Review step when someone must edit and approve.',
'Approval chains|Only workers in the same supervisory organization management chain. Use separate approval steps otherwise.',
'Consolidated approvals|Can be on any step except Initiation and include only steps before them.',
'Consolidated approval chain|Start with an Approval Chain step, then use Configure Consolidated Approval Chain in View mode.']]],

'conditions':[
['Building a condition rule','B1 pp. 274–276',[
'And/Or|How conditions combine. Parentheses control the order.',
'Source External Field or Condition Rule|The field being tested, such as Worker Location.',
'Relational Operator|How to compare, such as "in the selection list".',
'Comparison Type|Compare to a value you enter or to another field.',
'Comparison Value|The value, such as Sweden.',
'Delivered conditions|Some steps have Workday-owned entry conditions you cannot edit. Your conditions are added, and all must pass.']],
['Testing and troubleshooting','B1 pp. 276–277 · B2 p. 61',[
'Rule Tester|From an event\'s Related Actions > Business Process > Test Rule. Needs the Business Process Administration domain.',
'What it shows|The rule, an evaluation of each condition, sub-rule use, who created it, and which processes use it.',
'Tips|Build and test one condition at a time. Find fields with Business Object Details or the Workday Data Dictionary. Use Report Fields and Values to see which fields have values when the event runs.']],
['Validations','B2 pp. 67–72',[
'Warning|An orange alert. The user can continue.',
'Critical|A red error. The user must fix the data first.',
'Custom validations|Add a validation condition on an Initiation or Review step, then use Configure Validation Message for the text.',
'Examples|Block a legal name change without an attachment, or a time off request with no type.']],
['Optional and required fields','B2 pp. 68–69',[
'Configure Optional Fields|Hide or require fields for all users or for chosen security groups, by business process or functional area.',
'Based on|Country or security group.',
'Web services|Enforce Required in Web Services applies the rule to integrations too.']]],

'notifications':[
['Setting one up','B2 pp. 42–45',[
'Where|The definition\'s Related Actions > Business Process > Add Notification.',
'Trigger|On Status (such as Completed) or on a step\'s entry or exit.',
'Recipients|Participants, other users, or security groups.',
'Content|A subject and body built from text and fields.',
'Preview|Shows a sample with field names, not real values.']],
['Options','B2 pp. 42–43',[
'Override Email Template|Uses a template from Maintain Email Templates.',
'Do Not Include Notification Details Link|For recipients without a Workday account.',
'Conditions and Rules|The trigger and the conditions must both be met.',
'Email options|Mass Update Email Address Option on Notifications changes email settings for many notifications at once.',
'Field security|A field the recipient cannot see shows as [not available].']],
['System notifications and delivery','B2 pp. 41–42 · B1 p. 24',[
'System notifications|Tell users when tasks arrive. Turn them off with Maintain System Notifications > Disable on the Notifications tab.',
'Custom does not replace system|Adding a custom notification does not disable system ones.',
'Channels|Immediate email, daily digest email, and mobile push notifications.',
'Tenant settings|Edit Tenant Setup - Notifications holds default email, compliance, mobile, and delivery settings.',
'In Workday|The bell icon in the header opens Notifications, where you can filter, sort, and mark all as read.']]],

'standard-reports':[
['Workday Standard Reports','B1 pp. 40, 48',[
'Columns|Category, Report (with Related Actions), Name, Description, Type, Schedulable, and Domain.',
'Type|XpressO or Report Writer. Only Report Writer reports can be copied.',
'Domain|The domain that secures the report. You need access to one of them to run it.',
'Security|The list shows every report, even ones you cannot run. Running the list needs Custom Report Administration.',
'Copying|From the report\'s Related Actions > Standard Report > Copy, or Copy Standard Report to Custom Report. Needs Custom Report Creation.']],
['Report types','B2 p. 181 · B1 p. 41',[
'Simple|Quick, primary object only, not shareable.',
'Advanced|Primary and related objects, subtotals, prompts, charts, sharing, worklets, and web services.',
'Matrix|Groups and summarizes data you can drill into.',
'Composite|Combines advanced or matrix subreports from several data sources.',
'Search|Results narrowed with facets.',
'nBox|Counts in a two-dimensional grid.',
'Trending|Trends over time, such as headcount and attrition.',
'Transposed|Swaps rows and columns for side-by-side comparison.']],
['Search reports','B1 pp. 42–43',[
'Examples|Find Events, Browse Jobs, Find Workers, Find Worker for Project, Find Candidates, and Find Mentor.',
'Layout|A search bar, facets on the left, and results.']],
['Dashboards and hiding reports','B2 pp. 238–245',[
'Dashboards|Workday delivers dashboards per area; you can add unlimited custom dashboards with their own security domains. Manage them with Maintain Dashboards.',
'Worklets|Delivered worklets cannot be copied or changed. Custom reports of type Advanced, Composite, Matrix, nBox, Transposed, or Trending can be enabled as worklets.',
'Required, recommended, optional|Required worklets cannot be removed by users; recommended ones can. Required wins if both apply.',
'Hide Workday Delivered Report|Removes a standard report from search, menus, and Related Actions. Hidden settings do not move from Sandbox to Production.']]],

'custom-reports':[
['Reporting terms','B1 pp. 38, 43–44 · B2 pp. 182–186',[
'Business object|Like a table: fields are columns, instances are rows.',
'Primary business object|The main object; it decides which fields are available first.',
'Related business object|Linked to the primary object by a field, one-to-one or one-to-many.',
'Class report fields|Delivered, calculated, or custom fields. Object fields are actionable (blue); simple fields are not.',
'Business Object Details report|Shows an object\'s fields, related objects, data sources, and reports. Start here when planning a report.']],
['Data sources','B1 pp. 45–47 · B2 pp. 187–191',[
'Most important choice|The data source sets the population and the primary object.',
'Smallest that works|All Workers > All Active and Terminated Workers > All Active Employees, from most to fewest rows.',
'Indexed sources|Faster for large volumes, aggregation, and facets. Use indexed fields to keep the speed.',
'Optimized for Performance|On by default; limits you to indexed data sources and fields. Clear it on the Advanced tab to use non-indexed fields.',
'Built-in prompts|Some sources ask for values, such as Employees by Organization.']],
['Sort, filter, and prompts','B2 pp. 200–215',[
'Sort|Alphabetical or logical order (such as month order). Sub level sort orders related data.',
'Filters|Put the filter that removes the most rows first. Prefer data sources with built-in filters.',
'Subfilter|Filters related objects and runs before the filter. Add "is not empty" to drop rows with no related data.',
'Prompt types|"Prompt the user for the value" filters on a blank too; "...and ignore the filter condition if the value is blank" skips the filter.',
'Prompts tab|Defaults, labels, Required, Do Not Prompt at Runtime, and Populate Undefined Prompt Defaults.']],
['Sharing and scheduling','B2 pp. 215–229',[
'Sharing|Off by default. Share with all authorized users or chosen groups and users who can access the data source and its filter. Shared users can run it; report writers can also copy it.',
'What they see|Each user sees only the rows and fields their security allows.',
'Scheduling|Run now, once later, daily, weekly, monthly, dependent, or custom. Output can be Excel, PDF, or CSV.',
'Shared output|Recipients see the data exactly as the scheduler does, regardless of their own security. Needs Report Output Sharing.',
'Manage schedules|Scheduled Future Processes lets you edit, suspend, or transfer a schedule.']],
['Matrix reports','B2 pp. 230–234',[
'Groupings|At least one row grouping (up to 8) and up to 2 column groupings. Extra values roll into "Other" (defaults: 250 rows, 20 columns).',
'Summaries|Count (default), Count Distinct, Sum, Average, Minimum, Maximum, and Calculation.',
'Drilling|Drillable fields add up to two more dimensions; detail data shows the rows behind a number.']]],

'navigation':[
['Tenants and releases','B1 pp. 16–19',[
'Tenant types|Production (live data), Sandbox (a test copy), and Sandbox Preview (a copy with the next release). Implementation tenants are for building, loading, and testing.',
'Demo tenants|Global Modern Services (GMS), Alma Mater University, and Green Oak Valley.',
'Metadata vs tenanted data|Workday metadata is fixed, like an apartment\'s walls. Your configuration and data are tenanted data, like your furniture.',
'Releases|Weekly service updates, plus two feature releases a year. Preview tenants get features about five weeks early. Run What\'s New in Workday in the preview tenant.']],
['Getting around','B1 pp. 20–30',[
'Workday Home|Announcements, Awaiting Your Action, Timely Suggestions, Your Top Apps, and, for managers, Team Highlights and Important Dates.',
'Profile menu|View Profile, Home, My Account, Workbench (admin tools), Sitemap, Favorites, Audit, Drive, My Reports, Documentation, and Help.',
'Applications and dashboards|Security decides which apps you see. Required apps cannot be removed; optional ones can.',
'Worklets|Report snapshots on dashboards. A dashboard can have six tabs with six worklets each.',
'Related Actions|The menu beside an object, showing what you can do with it.']],
['Searching','B1 pp. 31–33',[
'Predictive search|Suggestions after three characters. Each word is matched separately.',
'Exact Match|Best for employee IDs, emails, and phone numbers.',
'Prefixes|bp: (definitions), event: (events), sup: (supervisory orgs), org: (organizations), worker: (workers). Type ? to list them all.',
'Categories|Articles, People, Tasks, and Reports are saved by default; add more and reorder them.',
'Synonyms|Map your terms to Workday terms in Edit Tenant Setup - Search.',
'Tip|Avoid generic words like find, edit, or create.']],
['Proxy for testing','B1 pp. 33–35',[
'What it is|Start Proxy lets an authorized tester act as another user; Stop Proxy ends it.',
'Limits|Non-production tenants only, one proxy policy per environment, and only unconstrained groups can get proxy access. No proxying while acting as a delegate.',
'Rule order|Workday stops at the first matching rule, so put the most restrictive rule first.']]],

'security-framework':[
['The building blocks','B1 pp. 55, 208–210',[
'Functional areas|Workday delivers the app in functional areas (such as Staffing and Core Compensation), each holding domains and business process types.',
'Domains|Collections of items with the same security: tasks, reports, data sources, fields, and web services.',
'Business process types|Events whose steps you configure.',
'Security policies|Each domain and BP type has a policy that lists which groups get access.',
'Security groups|Collections of users.']],
['What you can and cannot configure','B1 p. 213',[
'You can|Create security groups and membership, add groups to domain and BP policies, and configure definition steps.',
'You cannot|Change which domains and BP types are in a functional area, change which items are in a domain, or add BP types.',
'Custom domains|Workday provides 200 custom domains in the System functional area for custom items such as dashboards.']],
['Turning things on','B1 pp. 214–215',[
'Functional areas|Enable them with Maintain Functional Areas; the Functional Areas report gives an overview.',
'Suspended domains|A domain marked "Suspended - Policy not enabled" must be enabled from its Related Actions, then activated.',
'New domains|Rarely delivered enabled, so you decide when to adopt them.',
'New BP types|May need a security policy and a default definition before use.']],
['Configuring and checking access','B1 pp. 210, 213–214, 242–244',[
'Steps|Identify users, create groups, edit policies, activate pending changes, and test.',
'One security setup|All Workday apps share it, so a change for one app can affect others.',
'View Security for Securable Item|Shows the policies and groups for any item. Search "secura" and enter at least three characters.',
'Security Analysis for Securable Item and Account|Shows how one user gets access to an item.',
'Other reports|View Security Groups for User, Domain and BP Security Policies for Functional Area, and View Security Group.']]],

'security-groups':[
['Membership methods','B1 pp. 215–218',[
'Workday-assigned|Public and self-service groups that Workday maintains, such as All Employees and Employee As Self. New hires get them automatically.',
'Manually assigned|User-based and integration groups, such as HR Administrator or Report Writer.',
'Derived|Membership follows criteria: role-based (HR Partner), job-based (VPs), or location membership (U.S. Locations).',
'Other delivered groups|Implementers, Initiator, Manager\'s Manager, and Role Maintainer.']],
['Context types','B1 pp. 216–217',[
'Unconstrained|Members can reach all target instances of an item.',
'Constrained|Members reach a subset, usually by organization. Self-service groups see their own data; role-based groups see their organizations.',
'Mixed|Depends on the groups combined in intersection or aggregation groups.',
'Union|A user\'s access is the total of all their groups.']],
['User-based groups','B1 pp. 218–222',[
'Traits|Administrator-type, assigned to the person, always unconstrained, and system-wide.',
'They follow the person|They stay through job changes until someone removes them, so watch staffing changes.',
'Who can assign|Groups with Modify on User-Based Security Group Administration, or the group\'s Administered by Security Groups.',
'How|Assign Users to User-Based Security Group, Assign User-Based Security Groups for Person, or web services with Put permission. Update User-Based Security Group Assignments and Membership can add approval workflows.']],
['Role-based groups','B1 pp. 219, 225–233',[
'Traits|Partner or leader type, assigned to the position through a role, and constrained or unconstrained.',
'Dynamic|When a worker changes jobs, membership updates and old access goes away.',
'Unique ability|Only role-based constrained groups let you assign a position to a role in an organization it is not in.',
'Steps|Check the role in Maintain Assignable Roles, Create Security Group, assign positions to the role, edit policies, activate, and test.',
'Multiple jobs|Choose whether role holders reach only the positions they support, only through the primary job, or all positions.']]],

'security-advanced':[
['Groups based on worker data','B2 pp. 146–156',[
'Job-based|One job criterion: job profile, job category, job family, management level, work shift, or exempt status. Constrained (to an organization type the member is in, optionally with subordinates) or unconstrained.',
'Location membership|Workers at chosen locations. Always unconstrained.',
'Organization membership|Workers in chosen organizations of any type, including hierarchies. Constrained or unconstrained; unconstrained ones are often used inside other groups.',
'Manager and compensation level|Reach targets in lower management levels or lower compensation grades, regardless of organization. Needs a level or grade hierarchy.']],
['Combination groups','B2 pp. 157–161',[
'Aggregation|Members of any included group; each keeps its own constraints. Can exclude groups. Good as a hub that scales without touching policies.',
'Intersection|Members of all included groups, with constraints intersected. Can include aggregation groups, but not intersection, rule-based, or integration system groups.',
'Intersection exclusions|You can exclude an unconstrained group, or hide target positions in chosen organizations.',
'Segment-based|Controls which values members can use, such as expense items, document categories, pay components, or learning categories.']],
['Rule-based groups','B2 pp. 161–163',[
'How|Pick a baseline group, then include or exclude members with a security rule.',
'Baseline|Any type except aggregation, intersection, rule-based, or segment-based.',
'Rules|Up to five conditions on Worker, Student, or Extended Enterprise Learner fields. Enable fields with Maintain Fields for Security Rules.',
'Benefits|Change rules without activating policies, reuse rules, and get better performance than intersection.',
'Setup|Configure Set Up: Security Rules and Security Configuration in the System functional area. Test with Test Security Rule.']],
['Non-worker groups','B2 p. 164',[
'Service center|For third-party users such as an outside help desk. Representatives become members automatically. Constrained or unconstrained.',
'Integration system|For integration system users (ISUs), assigned manually. Get pulls data out; Put loads data in.']]],

'security-policies':[
['Domain security policies','B1 pp. 236–238',[
'What they control|Which groups can see or change items in a domain.',
'Item categories|Securable Actions (tasks and reports), Securable Reporting Items (data sources, filters, fields), and Securable Integrations (web services).',
'View vs Modify|View reaches only View items. Modify reaches both. With 3 Modify items and 7 View items, View gives 7 and Modify gives 10.',
'Get vs Put|For integrations. Put includes Get.',
'Multiple domains|One item can be in several domains; see Secured Items in Multiple Domains.',
'Child domains|Inherit the parent\'s permissions but can be changed.']],
['Business process security policies','B1 pp. 238–240',[
'Permissions|Who can start the process, do action steps, delegate, and act on the whole process: view all, approve, cancel, rescind, manually advance, and deny.',
'One per type|All definitions of a type share one policy, and each definition can route only to groups in it.',
'Editing|From the definition\'s Related Actions > Business Process Policy > Edit, or the Business Process Security Policies for Functional Area report.',
'Subprocesses|Do not inherit the parent\'s policy; configure each one.']],
['Activation and timestamps','B1 pp. 240–242',[
'Pending|Policy edits are saved but inactive until you run Activate Pending Security Policy Changes.',
'Security evaluation moment|Activation records a timestamp; Workday checks security as of that moment.',
'Revert|Activate Previous Security Timestamp goes back while you fix problems. It is not for keeping alternate setups.',
'Not timestamped|Group membership and group definition changes take effect at once.',
'Pending reports|Business Process Security Policies with Pending Changes and Domain Security Policies with Pending Changes.']],
['Template-driven processes','B2 pp. 93–98',[
'Why both|Processes such as Termination and Change Job use templates whose sections are secured by domain.',
'Example|A group added to the Termination BP policy can start it but sees only comments and attachments until it gets the Staffing Actions: Termination Details domain.',
'Checking|The template\'s Task Security tab and the Template-Driven Business Process Security report.']]],
};
