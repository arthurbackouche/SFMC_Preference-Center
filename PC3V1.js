<head>
<link rel="stylesheet" type="text/css" href="https://mcvwz360h2h1nv0py3hfwckc58jm.pub.sfmc-content.com/bh4rdo5sfzr" />  
</head>
%%[

/* Get subscriber values */

set @subscriberkey = requestparameter('subscriberkey')
set @email = requestparameter('email')
set @jobid = requestparameter('jobid')
set @batchid = requestparameter('batchid')
set @listid = requestparameter ('listid')
set @emailName = requestparameter('emailName')

/* Get Form values */

set @Dragons_Community_News = requestparameter('Dragons Community News')
set @Dragons_Hospitality = requestparameter('Dragons Hospitality')
set @Dragons_NRL_News = requestparameter('Dragons NRL News')
set @Dragons_NRLW_News = requestparameter('Dragons NRLW News')
set @Dragons_Team_Store = requestparameter('Dragons Team Store')
set @Dragons_Ticketing = requestparameter('Dragons Ticketing')
set @Junior_Clinics = requestparameter('Junior Clinics')
set @NRL_Major_Events_and_Ticketing = requestparameter('NRL Major Events and Ticketing')
set @Sponsor_Offers = requestparameter('Sponsor Offers')

set @unsuball = requestparameter('unsuball')
set @frequency = requestparameter('frequency')

/* checkbox fixes */
if @Dragons_Community_News == 'on' then set @Dragons_Community_News = 'True' else set @Dragons_Community_News = 'False' endif
if @Dragons_Hospitality == 'on' then set @Dragons_Hospitality = 'True' else set @Dragons_Hospitality = 'False' endif
if @Dragons_NRL_News == 'on' then set @Dragons_NRL_News = 'True' else set @Dragons_NRL_News = 'False' endif
if @Dragons_NRLW_News == 'on' then set @Dragons_NRLW_News = 'True' else set @Dragons_NRLW_News = 'False' endif
if @Dragons_Team_Store == 'on' then set @Dragons_Team_Store = 'True' else set @Dragons_Team_Store = 'False' endif
if @Dragons_Ticketing == 'on' then set @Dragons_Ticketing = 'True' else set @Dragons_Ticketing = 'False' endif
if @Junior_Clinics == 'on' then set @Junior_Clinics = 'True' else set @Junior_Clinics = 'False' endif
if @NRL_Major_Events_and_Ticketing == 'on' then set @NRL_Major_Events_and_Ticketing = 'True' else set @NRL_Major_Events_and_Ticketing = 'False' endif
if @Sponsor_Offers == 'on' then set @Sponsor_Offers = 'True' else set @Sponsor_Offers = 'False' endif

if not empty(@subscriberkey) == true then
 /* processing */
 if @unsuball == 'on' then 
  /* global opt out */
  set @updateSubscriber = UpdateData('Master Subscribers', 1, 'Subscriber Key', @subscriberkey, 
  'Dragons Community News', 'False', 
  'Dragons Hospitality', 'False',
  'Dragons NRL News', 'False',
  'Dragons NRLW News', 'False',
  'Dragons Team Store', 'False',
  'Dragons Ticketing', 'False',
  'Junior Clinics', 'False',
  'NRL Major Events and Ticketing', 'False',
  'Sponsor Offers', 'False',
  'Email Frequency', @frequency,
  'Email Status', 'Unsubscribed'
  )
  
    /* log unsub event */
  SET @logUnsubEvent = CreateObject("ExecuteRequest")
  SetObjectProperty(@logUnsubEvent, "Name", "LogUnsubEvent")

  SET @UnsubProperty = CreateObject("APIProperty")
  SetObjectProperty(@UnsubProperty, "Name", "SubscriberKey")
  SetObjectProperty(@UnsubProperty, "Value", @subscriberKey)
  AddObjectArrayItem(@logUnsubEvent, "Parameters", @UnsubProperty)

  SET @UnsubProperty = CreateObject("APIProperty")
  SetObjectProperty(@UnsubProperty, "Name", "JobID")
  SetObjectProperty(@UnsubProperty, "Value", @jobid)
  AddObjectArrayItem(@logUnsubEvent, "Parameters", @UnsubProperty)

  SET @UnsubProperty = CreateObject("APIProperty")
  SetObjectProperty(@UnsubProperty, "Name", "ListID")
  SetObjectProperty(@UnsubProperty, "Value", @listid)
  AddObjectArrayItem(@logUnsubEvent, "Parameters", @UnsubProperty)

  SET @UnsubProperty = CreateObject("APIProperty")
  SetObjectProperty(@UnsubProperty, "Name", "BatchID")
  SetObjectProperty(@UnsubProperty, "Value", @batchid)
  AddObjectArrayItem(@logUnsubEvent, "Parameters", @UnsubProperty)

  SET @logUnsubEvent_status = InvokeExecute(@logUnsubEvent, @overallStatus, @requestId)
  SET @Status = Field(Row(@logUnsubEvent_status, 1), "StatusMessage")
  SET @Error = Field(Row(@logUnsubEvent_status, 1), "ErrorCode")
  
    if @updateSubscriber == 1 AND @Error == 0 then
   set @message = 'You have been unsubscribed'
  else
   set @message = 'An error has occured, please try again at a later time. If the problem persist please contact us through our help center.'
  endif

  ]%%
  %%=v(@message)=%%
  %%[
  

 else
  /* subscription changes */
  set @updateSubscriber = UpdateData('Master Subscribers', 1, 'Subscriber Key', @subscriberkey, 
  'Dragons Community News', @Dragons_Community_News, 
  'Dragons Hospitality', @Dragons_Hospitality,
  'Dragons NRL News', @Dragons_NRL_News ,
  'Dragons NRLW News', @Dragons_NRLW_News, 
  'Dragons Team Store', @Dragons_Team_Store, 
  'Dragons Ticketing', @Dragons_Ticketing ,
  'Junior Clinics', @Junior_Clinics ,
  'NRL Major Events and Ticketing', @NRL_Major_Events_and_Ticketing ,
  'Sponsor Offers', @Sponsor_Offers,
  'Email Frequency', @Email_Frequency
  )
  if @updateSubscriber == 1 then
   set @message = 'Your preferences have been updated.'
  else
   set @messagew = 'An error has occured'
  endif

  ]%%
  %%=v(@message)=%%
  %%[

 endif

else
 /* no subscriber key redirect */
 redirect('https://www.dragons.com.au/')
endif

]%%