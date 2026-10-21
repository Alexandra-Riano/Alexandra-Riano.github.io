/* End-of-lesson TL;DR: the few points to remember from each lesson, condensed from the lesson, its study notes, and its exam trap.
   Each lesson: [bullets]. A bullet written "Term|text" shows the term in bold, as in notes.js. */
const TLDR={
'job-families':[
'Hierarchy|Job family group > job family > job profile. Families and groups are optional.',
'Many-to-many|A profile can sit in one or more families; a family can belong to a family group.',
'What they power|Prompt filters, job-profile reports, Recruiting categories, condition rules, eligibility rules, Job Family hiring restrictions, and job-based security.',
'Exam trap|If a compensation eligibility rule uses a family, every new profile must join that family or pay will not default.',
'Not a structure for people|A family classifies work. It is not a supervisory organization or a staffing model.'],

'job-profiles':[
'What it is|A reusable, generic job definition. Jobs and positions are created from it, and every worker needs one.',
'Required fields|Only Job Profile Name, Job Code, and effective date. Job Code stops being required when an ID Definition generates it.',
'Defaults at hire|Management level, job classification, company insider types, and work shift come from the profile.',
'Position beats profile|When both hold a value, Workday uses the position value.',
'Reuse|One profile can back many positions, such as an Executive Assistant profile used in several departments.'],

'job-management':[
'Restrictions on the org|Set once on the supervisory organization and applied to every job in it.',
'No limit, no vacancy|Hire as many workers as fit the restrictions; the job ends when the worker leaves.',
'Reporting|Current headcount only.',
'Restriction criteria|Job family, job profile, location, worker type, worker sub type, time type, or No Job Restrictions. Pick at least one.',
'Exam trap|Edit Staffing Model is available only until restrictions are set or positions exist. Subordinates inherit the model but can change it.'],

'position-management':[
'Open position required|You need an open, approved position to hire, promote, demote, or transfer a worker in.',
'Positions persist|A position exists apart from its incumbent and stays open until filled or closed by hand.',
'Per-position restrictions|Each position has its own restrictions. Edit Position Restrictions affects future hires only.',
'Reporting|Open and filled positions, position history, and time to fill.',
'Choose it when|The scenario needs seat-level control, vacancy tracking, or position history.'],

'staffing-processes':[
'Prepare first|Position Management needs a position (Create Position); Job Management needs hiring restrictions.',
'Missing Hire|If Hire is not in the organization\'s Related Actions, the organization is not prepared yet.',
'Hire records|Hire date, position, employee type, job profile, time type, and location. Weekly hours default from the location.',
'Typical Hire steps|Propose Compensation Hire, Change Organization Assignments, Review Employee Hire, and a Create Workday Account service step.',
'Fixing events|Correct (in progress or completed, needs a comment), Cancel (in progress), Rescind (completed).'],

'change-job':[
'Two starting tasks|Start Job Change for managers (template questions); Transfer, Promote or Change Job for administrators (guided editor).',
'Templates|Maintain Change Job Templates sets fields, sections, subprocesses, reasons, and help text.',
'Reasons|Maintain Event Categories and Reasons maps your reasons to Transfer, Promotion, Lateral Move, Demotion, and Data Change.',
'Request Transfer|For a manager who has no access to the worker yet.',
'Exam trap|Template sections need domain permissions as well as the BP policy, and rescinding Change Job does not undo role changes.'],

'termination':[
'Three ways in|Terminate Employee, Submit Resignation (needs the Review Worker Initiated Termination step), or Severance.',
'Dates|The termination date is the last day of employment; the worker is terminated just after midnight in their own time zone.',
'Clean-up steps|Manage Business Processes for Worker (reassign or cancel tasks), Assign Roles, and Terminate User Account.',
'Job overlap and No Show|Overlap lets a replacement share the position (Position Management only). No Show is for a hire who never started.',
'Exam trap|A group on the Termination BP policy can start it but cannot see Reason or Details without the matching domain policies.'],

'compensation':[
'Building blocks|A package groups grades and plans. A grade gives a pay range; a grade profile localizes it.',
'Ranges are guidance|A salary outside the grade range gives a warning, not an error.',
'Eligibility rules|Decide who can receive each component. Two rules on one component use OR.',
'When pay defaults|Only when the worker is eligible for exactly one package and grade, and the plan is in that package.',
'Exam trap|Eligible for a plan outside the package means selectable but not defaulted. Two packages or grades means nothing defaults.'],

'organization-types':[
'Supervisory org|The management hierarchy. It holds positions and restrictions, and every worker belongs to exactly one.',
'Other types|Company (legal entity), cost center (revenue and expense), region (area of responsibility), pay group, location, and matrix (dotted line).',
'Inherited by subordinates|Visibility, Primary Location, Staffing Model, and Roles.',
'Locations first|Primary Location is required on a supervisory org, so create a location before it.',
'Custom types|Only when delivered types do not fit.'],

'organization-hierarchies':[
'One type each|A hierarchy rolls up organizations of its own type only, and can include other hierarchies of that type.',
'No transactions|Transactions are recorded on organizations; costs roll up automatically.',
'Roles on hierarchies|Assign location-based roles such as HR Partner (by location) on a location hierarchy, not a single location.',
'Reorganization events|Group related changes under one effective date. Track them with the Reorganizations report.',
'Purpose|Reporting rollups and role inheritance. The management chain does not change.'],

'organization-assignments':[
'Default|The one value that fills in automatically during staffing.',
'Allowed|The values users may pick. A blank allowed list means any value of that type.',
'Keep them aligned|A default should also be in the allowed list.',
'Inheritance|Subordinates use their superior\'s values unless they have their own; entering a value overrides it.',
'Automatic membership|Workers hired or transferred in join the organization\'s default organizations.'],

'assignable-roles':[
'Attached to the chair|A role belongs to a position or job, not the person, so it survives incumbent changes.',
'What roles drive|Role-based security, business process routing, approvals, and notifications.',
'Inheritance|Roles can be inherited from the superior, assigned directly, or filled by a Default Role.',
'Risk|An unassigned role can leave workflow tasks with no one to act on them.',
'Exam trap|A role alone grants nothing. Access needs group membership plus a policy permission.'],

'bp-framework':[
'Type|The event category Workday delivers, such as Hire. You cannot add types.',
'Definition|Your configured workflow for a type: steps, order, groups, conditions, notifications, completion.',
'Event|One transaction running through a definition, such as Hire: Logan McNeil.',
'Which version runs|The definition in effect on the initiation date.',
'Planning tool|Business Process Configuration Options shows what each type allows.'],

'bp-definitions':[
'Default first|Workday recommends one default definition because it is easiest to maintain.',
'Organization-specific|For an organization whose steps differ greatly; it covers that organization and its subordinates.',
'Rule-based|One condition rule, evaluated once at initiation. Use it when the same rule would sit on three or more steps.',
'Fallback order|Rule-based match, then the organization\'s or nearest superior\'s definition, then the default. Inactive or broken ones are skipped.',
'Completion step|Commits the data. Only one per process, and every approval and review comes before it.'],

'bp-advanced':[
'Routing restrictions|Exclude Initiator, Exclude Prior Approvers, or Exclude Event Subject, set in Maintain Advanced Routing.',
'All excluded|The step is skipped unless you name an alternate group.',
'Step delay|Pauses before a step, based on the prior step, the initiation date, or a field like Effective Date.',
'Version rule|An event uses the definition in effect when it is initiated, never a future-dated one.',
'Parallel steps|Steps with the same order letter run at the same time.'],

'bp-steps':[
'Initiation|Always first and cannot be removed.',
'Action|A review (can edit and approve) or a subprocess.',
'Approval|Approve, send back, or deny. No editing, and a denial denies the whole process.',
'Service vs To Do|Service runs Workday automation; To Do is a reminder you create with Maintain To Dos.',
'Consolidated approval|Combines approvals for one worker, but only for steps before it.'],

'conditions':[
'Entry|Should the step run? Works on every step except Initiation.',
'Validation|May the process continue? Warning lets the user continue; Critical makes them fix the data.',
'While Running|Approval chains only: does the next approver act?',
'Exit|Approval chains and Integration steps: may the step complete?',
'Exam trap|Create Condition Rule only saves a rule; Maintain Step Conditions attaches it. Before completion, Hire data is still "proposed".'],

'notifications':[
'Triggers|Process status (such as Completed), or a step being entered or exited. Trigger and condition must both be met.',
'Recipients|Participants, other users, or security groups.',
'No access granted|Receiving a notification never grants access, and fields the recipient cannot see show as [not available].',
'System vs custom|Adding a custom notification does not turn off system notifications.',
'Not a step|A notification informs. Use an Approval or Action when work is required.'],

'standard-reports':[
'Check delivered first|Look for a standard report before building a custom one.',
'Workday Standard Reports|Lists every delivered report with type, schedulable flag, and securing domain. Seeing a report there does not mean you can run it.',
'Copying|Only Report Writer reports can be copied, and that needs Custom Report Creation.',
'Reports to know|Business Process Configuration Options, Business Process Definitions for Business Object, Reorganizations, Job Catalog.',
'Security|Access to a report and the rows you see both depend on security.'],

'custom-reports':[
'Data source first|It sets the population and the primary object, and it matters most for performance. Pick the smallest one that works.',
'Objects decide fields|The primary object decides which related objects and fields you can reach.',
'Filter vs subfilter|Filter works on the primary object; subfilter works on related objects and runs first.',
'Sharing|Off by default, and only to users who can access the data source and its filter.',
'Exam trap|Missing a field? Check the data source and object relationships, not the columns.'],

'navigation':[
'Tenants|Production holds live data; Sandbox is a test copy; Sandbox Preview adds the next release.',
'Search prefixes|bp: for definitions, event: for events, sup: for supervisory orgs, org: for organizations, worker: for workers. Type ? for all.',
'Related Actions|Show what you can do with an object, based on your security.',
'Proxy|Start Proxy lets testers act as another user, but never in Production, and only unconstrained groups get proxy access.',
'Releases|Two feature releases a year plus weekly service updates.'],

'security-framework':[
'Access chain|User > security group > policy > secured item.',
'Domain policy|Who can view or modify items in a domain (tasks, reports, data sources, fields).',
'BP policy|Who can initiate or act on a business process type.',
'Exam trap|Creating a group or assigning a role grants nothing until a policy gives that group permission.',
'Troubleshoot|View Security for Securable Item, then Security Analysis for Securable Item and Account.'],

'security-groups':[
'Membership methods|Workday-assigned (All Employees, Employee As Self), manually assigned (user-based), or derived (role-based, job-based).',
'Context types|Unconstrained reaches all targets; constrained reaches a subset, usually by organization.',
'User-based|Always unconstrained and follows the person through job changes until removed.',
'Role-based|Follows the role on the position, so access updates when the worker moves.',
'Union|A user\'s access is the total of all their groups\' permissions.'],

'security-advanced':[
'Job-based|One job criterion, such as job profile, job family, or management level. Constrained or unconstrained.',
'Location vs organization membership|Location membership is always unconstrained; organization membership can be constrained.',
'Aggregation vs intersection|Aggregation: members of any included group. Intersection: members of all included groups, constraints intersected.',
'Rule-based|A baseline group filtered by a security rule. Changing the rule needs no activation.',
'Non-workers|Service center groups for third parties; integration system groups for ISUs.'],

'security-policies':[
'Domain policy|View or Modify (Get or Put for integrations). Modify includes View; child domains inherit from the parent.',
'BP policy|One per process type, shared by all its definitions. Subprocesses do not inherit it.',
'Activation|Policy edits stay pending until Activate Pending Security Policy Changes. Group membership changes apply at once.',
'Template-driven processes|Termination and Change Job need the BP policy plus domain access to each section.',
'Exam trap|Can view data but cannot start Change Job? Check the Change Job BP policy, not the domains.']
};
