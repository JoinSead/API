var should = require('should');
var app = require('./../../app');
var mongoose = require('mongoose');
var tmp = false;

describe('schema:mongodb', function(){

    describe('ips', function(){

        it('Should create a ips schema with particular characteristics', function(){
            var tmp = require('./../../schema/mongodb/ips');
            tmp.should.have.property('_id');
            tmp.should.have.property('ipv4_addr');
            tmp.should.have.property('ipv6_addr');
            tmp.should.have.property('white_list');
            tmp.should.have.property('black_list');
        });

        it('Should register a mongoose model named ips', function(){
            (function(){
              model = mongoose.model('ips');
            }).should.not.throw();
        });

    });


    describe('billing_profiles', function(){

        it('Should create a billing_profiles schema with particular characteristics', function(){
            var tmp = require('./../../schema/mongodb/billing_profiles');
            tmp.should.have.property('_id');
            tmp.should.have.property('user_type');
            tmp.should.have.property('ref_id');
            tmp.should.have.property('stripe_customer_id');
            tmp.should.have.property('credit_card_number');
            tmp.should.have.property('expiration_month');
            tmp.should.have.property('expiration_year');
            tmp.should.have.property('cvc');
            tmp.should.have.property('meta_data_customer');
            tmp.should.have.property('meta_data_card');
            tmp.should.have.property('is_valid');
        });

        it('Should register a mongoose model named billing_profiles', function(){
            (function(){
              model = mongoose.model('billing_profiles');
            }).should.not.throw();
        });

    });

    describe('relationships', function(){

        it('Should create a relationships schema with particular characteristics', function(){
            var tmp = require('./../../schema/mongodb/relationships');
            tmp.should.have.property('_id');
            tmp.should.have.property('user');
            tmp.should.have.property('created');
            tmp.should.have.property('type');
        });

        it('Should register a mongoose model named relationships', function(){
            (function(){
              model = mongoose.model('relationships');
            }).should.not.throw();
        });

    });

    describe('flags', function(){

        it('Should create a flags schema with particular characteristics', function(){
            var tmp = require('./../../schema/mongodb/flags');
            tmp.should.have.property('_id');
            tmp.should.have.property('type');
            tmp.should.have.property('ref_id');
            tmp.should.have.property('ref_url');
            tmp.should.have.property('sender_type');
            tmp.should.have.property('sender_ref_id');
            tmp.should.have.property('sender_comments');
            tmp.should.have.property('is_resolved');
            tmp.should.have.property('timestamp');
            tmp.should.have.property('resolved_timestamp');
            tmp.should.have.property('snapshot');
        });

        it('Should register a mongoose model named flags', function(){
            (function(){
              model = mongoose.model('flags');
            }).should.not.throw();
        });

    });

    describe('images', function(){

        it('Should create a images schema with particular characteristics', function(){
            var tmp = require('./../../schema/mongodb/images');
            tmp.should.have.property('_id');
            tmp.should.have.property('user');
            tmp.should.have.property('purpose_type');
            tmp.should.have.property('purpose_ref_id');
            tmp.should.have.property('created');
            tmp.should.have.property('last_updated');
            tmp.should.have.property('storage_location');
            tmp.should.have.property('upload_method');
            tmp.should.have.property('width');
            tmp.should.have.property('height');
        });

        it('Should register a mongoose model named images', function(){
            (function(){
              model = mongoose.model('images');
            }).should.not.throw();
        });

    });

    describe('messages', function(){

        it('Should create a messages schema with particular characteristics', function(){
            var tmp = require('./../../schema/mongodb/messages');
            tmp.should.have.property('_id');
            tmp.should.have.property('sender_type');
            tmp.should.have.property('sender_ref_id');
            tmp.should.have.property('recipient_type');
            tmp.should.have.property('recipient_ref_id');
            tmp.should.have.property('subject');
            tmp.should.have.property('message');
            tmp.should.have.property('sent_timestamp');
            tmp.should.have.property('opened_timestamp');
            tmp.should.have.property('opened_relayed_timestamp');
            tmp.should.have.property('tracking_id');
        });

        it('Should register a mongoose model named messages', function(){
            (function(){
              model = mongoose.model('messages');
            }).should.not.throw();
        });

    });


    describe('system', function(){

        it('Should create a system schema with particular characteristics', function(){
            var tmp = require('./../../schema/mongodb/system');
            tmp.should.have.property('_id');
            tmp.should.have.property('pro_mode');
            tmp.should.have.property('client_mode');
            tmp.should.have.property('admin_mode');
            tmp.should.have.property('api_mode');
        });

        it('Should register a mongoose model named system', function(){
            (function(){
              model = mongoose.model('system');
            }).should.not.throw();
        });

    });

    describe('resets', function(){

        it('Should create a resets schema with particular characteristics', function(){
            var tmp = require('./../../schema/mongodb/resets');
            tmp.should.have.property('_id');
            tmp.should.have.property('user_type');
            tmp.should.have.property('user_id');
            tmp.should.have.property('issued');
            tmp.should.have.property('expires');
            tmp.should.have.property('is_claimed');
            tmp.should.have.property('tokens');
            tmp.should.have.property('url');
        });

        it('Should register a mongoose model named resets', function(){
            (function(){
              model = mongoose.model('resets');
            }).should.not.throw();
        });

    });

    describe('tokens', function(){

        it('Should create a tokens schema with particular characteristics', function(){
            var tmp = require('./../../schema/mongodb/tokens');
            tmp.should.have.property('_id');
            tmp.should.have.property('user_type');
            tmp.should.have.property('user_id');
            tmp.should.have.property('ipv4_addr');
            tmp.should.have.property('issued');
            tmp.should.have.property('expires');
        });

        it('Should register a mongoose model named tokens', function(){
            (function(){
              model = mongoose.model('tokens');
            }).should.not.throw();
        });

    });


    describe('transactions', function(){

        it('Should create a transactions schema with particular characteristics', function(){
            var tmp = require('./../../schema/mongodb/transactions');
            tmp.should.have.property('_id');
            tmp.should.have.property('type');
            tmp.should.have.property('ref_id');
            tmp.should.have.property('user');
            tmp.should.have.property('items');
            tmp.should.have.propertyByPath('items',[0],'name');
            tmp.should.have.propertyByPath('items',[0],'description');
            tmp.should.have.propertyByPath('items',[0],'quantity');
            tmp.should.have.propertyByPath('items',[0],'price');
            tmp.should.have.property('service_percent');
            tmp.should.have.property('convenience_fee');
            tmp.should.have.property('subtotal');
            tmp.should.have.property('tax');
            tmp.should.have.property('stripe_fee');
            tmp.should.have.property('is_stripe_fee_added');
            tmp.should.have.property('total');
            tmp.should.have.property('timestamp');
            tmp.should.have.property('stripe_transaction_id');
            tmp.should.have.property('billing_profile');
            tmp.should.have.property('billing_recipient');
            tmp.should.have.property('invoice_id');
            tmp.should.have.property('private_hash');
            tmp.should.have.property('status');
        });

        it('Should register a mongoose model named transactions', function(){
            (function(){
              model = mongoose.model('transactions');
            }).should.not.throw();
        });

    });

    describe('admins', function(){

        it('Should create a users_admin schema with particular characteristics', function(){
            var tmp = require('./../../schema/mongodb/admins');
            tmp.should.have.property('_id');
            tmp.should.have.property('name_last');
            tmp.should.have.property('name_first');
            tmp.should.have.property('email');
            tmp.should.have.propertyByPath('email','address');
            tmp.should.have.propertyByPath('email','timestamp');
            tmp.should.have.property('password_hash');
            tmp.should.have.property('phone');
            tmp.should.have.propertyByPath('phone','number');
            tmp.should.have.propertyByPath('phone','timestamp');
            tmp.should.have.property('ips_added');
            tmp.should.have.property('messages_sent');
        });

        it('Should register a mongoose model named users_admin', function(){
            (function(){
              model = mongoose.model('users_admin');
            }).should.not.throw();
        });

    });

    describe('users', function(){

        it('Should create a users schema with particular characteristics', function(){
            var tmp = require('./../../schema/mongodb/users');
            tmp.should.have.property('_id');
            tmp.should.have.property('name_first');
            tmp.should.have.property('name_last');
            tmp.should.have.property('ipv4_addr');
            tmp.should.have.property('created_timestamp');
            tmp.should.have.property('billing_profiles');
            tmp.should.have.property('billing_recipients');
            tmp.should.have.property('transactions');
            tmp.should.have.property('profile_images');
            tmp.should.have.property('banner_images');
            tmp.should.have.property('relationships');
            tmp.should.have.property('messages_sent');
            tmp.should.have.property('messages_received');
            tmp.should.have.property('terms_agreement_timestamp');
            tmp.should.have.property('location');
            tmp.should.have.propertyByPath('locations','name');
            tmp.should.have.propertyByPath('locations','address');
            tmp.should.have.propertyByPath('locations','geo');
            tmp.should.have.property('password_hash');
            tmp.should.have.property('email');
            tmp.should.have.propertyByPath('email','address');
            tmp.should.have.propertyByPath('email','is_confirmed');
            tmp.should.have.propertyByPath('email','confirmation_id');
            tmp.should.have.propertyByPath('email','confirmation_timestamp');
            tmp.should.have.propertyByPath('email','relay_messages');
            tmp.should.have.propertyByPath('email','reveal_to_connections');
            tmp.should.have.propertyByPath('email','mailing_list_subscribe');
            tmp.should.have.property('library');
            tmp.should.have.property('projects');

        });

        it('Should register a mongoose model named users_client', function(){
            (function(){
              model = mongoose.model('users_client');
            }).should.not.throw();
        });

    });


    describe('aliases', function(){

        it('Should create an aliases schema with particular characteristics', function(){
            var tmp = require('./../../schema/mongodb/aliases');
            tmp.should.have.property('_id');
            tmp.should.have.property('url');
            tmp.should.have.property('type');
            tmp.should.have.property('ref_id');
            tmp.should.have.property('creator_type');
            tmp.should.have.property('creator_ref_id');
        });

        it('Should register a mongoose model named aliases', function(){
            (function(){
              model = mongoose.model('aliases');
            }).should.not.throw();
        });

    });


    describe('imported_titles', function(){

        it('Should create an imported_titles schema with particular characteristics', function(){
            var tmp = require('./../../schema/mongodb/imported_titles');
            tmp.should.have.property('_id');
            tmp.should.have.property('name');
            tmp.should.have.property('description');
            tmp.should.have.property('source');
            tmp.should.have.propertyByPath('source','name');
            tmp.should.have.propertyByPath('source','type');
            tmp.should.have.propertyByPath('source','url');
            tmp.should.have.property('status');
            tmp.should.have.property('text');
            tmp.should.have.property('book');

        });

        it('Should register a mongoose model named aliases', function(){
            (function(){
              model = mongoose.model('imported_titles');
            }).should.not.throw();
        });

    });

    describe('libraries', function(){

        it('Should create an libraries schema with particular characteristics', function(){
            var tmp = require('./../../schema/mongodb/libraries');
            tmp.should.have.property('_id');
            tmp.should.have.property('titles');
            tmp.should.have.propertyByPath('titles',[0],'project_id');
            tmp.should.have.propertyByPath('titles',[0],'release_id');
            tmp.should.have.propertyByPath('titles',[0],'checkout_id');
            tmp.should.have.propertyByPath('titles',[0],'transactions');
            tmp.should.have.propertyByPath('titles',[0],'bookmarks');
            tmp.should.have.propertyByPath('titles',[0],'annotations');
            tmp.should.have.propertyByPath('titles',[0],'current_place');
            tmp.should.have.propertyByPath('titles',[0],'has_finished_reading');
            tmp.should.have.propertyByPath('titles',[0],'status');
        });

        it('Should register a mongoose model named aliases', function(){
            (function(){
              model = mongoose.model('libraries');
            }).should.not.throw();
        });

    });

    describe('projects', function(){

        it('Should create an projects schema with particular characteristics', function(){
            var tmp = require('./../../schema/mongodb/projects');
            tmp.should.have.property('_id');
            tmp.should.have.property('title');
            tmp.should.have.property('profile_image');
            tmp.should.have.property('banner_image');
            tmp.should.have.property('cover_image');
            tmp.should.have.property('description');
            tmp.should.have.property('created');
            tmp.should.have.property('categories');
            tmp.should.have.property('author');
            tmp.should.have.property('co_authors');
            tmp.should.have.property('contributors');
            tmp.should.have.property('presale_price');
            tmp.should.have.property('presale_info');
            tmp.should.have.property('presale_transactions');
            tmp.should.have.property('group_messages');
            tmp.should.have.property('releases');
            tmp.should.have.property('chapters');
            tmp.should.have.property('checkouts');
            tmp.should.have.property('transactions');
            tmp.should.have.property('reviews');

        });

        it('Should register a mongoose model named projects', function(){
            (function(){
              model = mongoose.model('projects');
            }).should.not.throw();
        });

    });

    describe('chapters', function(){

        it('Should create an chapters schema with particular characteristics', function(){
            var tmp = require('./../../schema/mongodb/chapters');
            tmp.should.have.property('_id');
            tmp.should.have.property('project_id');
            tmp.should.have.property('number');
            tmp.should.have.property('name');
            tmp.should.have.property('description');
            tmp.should.have.property('content');
            tmp.should.have.property('created');
            tmp.should.have.property('snapshots');
            tmp.should.have.property('author_annotations');
        });

        it('Should register a mongoose model named chapters', function(){
            (function(){
              model = mongoose.model('chapters');
            }).should.not.throw();
        });

    });



    describe('chapter_snapshots', function(){

        it('Should create an chapter_snapshots schema with particular characteristics', function(){
            var tmp = require('./../../schema/mongodb/chapter_snapshots');
            tmp.should.have.property('_id');
            tmp.should.have.property('chapter_id');
            tmp.should.have.property('created');
            tmp.should.have.property('save_type');
            tmp.should.have.property('note');
            tmp.should.have.property('chapter_data');
        });

        it('Should register a mongoose model named chapter_snapshots', function(){
            (function(){
              model = mongoose.model('chapter_snapshots');
            }).should.not.throw();
        });

    });


    describe('reviews', function(){

        it('Should create an reviews schema with particular characteristics', function(){
            var tmp = require('./../../schema/mongodb/reviews');
            tmp.should.have.property('_id');
            tmp.should.have.property('release_id');
            tmp.should.have.property('project_id');
            tmp.should.have.property('created');
            tmp.should.have.property('user');
            tmp.should.have.property('rating');
            tmp.should.have.property('title');
            tmp.should.have.property('content');
        });

        it('Should register a mongoose model named reviews', function(){
            (function(){
              model = mongoose.model('reviews');
            }).should.not.throw();
        });

    });

    describe('annotations', function(){

        it('Should create an comments schema with particular characteristics', function(){
            var tmp = require('./../../schema/mongodb/annotations');
            tmp.should.have.property('_id');
            tmp.should.have.property('project_id');
            tmp.should.have.property('release_id');
            tmp.should.have.property('position');
            tmp.should.have.property('title');
            tmp.should.have.property('content');
            tmp.should.have.property('is_public');
            tmp.should.have.property('rewards');
            tmp.should.have.property('reactions');
        });

        it('Should register a mongoose model named annotations', function(){
            (function(){
              model = mongoose.model('annotations');
            }).should.not.throw();
        });

    });

    describe('comments', function(){

        it('Should create an comments schema with particular characteristics', function(){
            var tmp = require('./../../schema/mongodb/comments');
            tmp.should.have.property('_id');
            tmp.should.have.property('annotation_id');
            tmp.should.have.property('created');
            tmp.should.have.property('in_reply_to_comment_id');
            tmp.should.have.property('title');
            tmp.should.have.property('content');
            tmp.should.have.property('rewards');
            tmp.should.have.property('reactions');
        });

        it('Should register a mongoose model named comments', function(){
            (function(){
              model = mongoose.model('comments');
            }).should.not.throw();
        });

    });


    describe('releases', function(){

        it('Should create an releases schema with particular characteristics', function(){
            var tmp = require('./../../schema/mongodb/releases');
            tmp.should.have.property('_id');
            tmp.should.have.property('semver_id');
            tmp.should.have.property('project');
            tmp.should.have.property('chapter_snapshot_ids');
            tmp.should.have.property('price');
            tmp.should.have.property('created');
            tmp.should.have.property('checkouts');
            tmp.should.have.property('meta');
            tmp.should.have.property('content');
            tmp.should.have.property('annotations');
            tmp.should.have.property('comments');

        });

        it('Should register a mongoose model named releases', function(){
            (function(){
              model = mongoose.model('releases');
            }).should.not.throw();
        });

    });


    describe('checkouts', function(){

        it('Should create an checkouts schema with particular characteristics', function(){
            var tmp = require('./../../schema/mongodb/checkouts');
            tmp.should.have.property('_id');
            tmp.should.have.property('release_id');
            tmp.should.have.property('user');
            tmp.should.have.property('created');
            tmp.should.have.property('status');
            tmp.should.have.property('library_id');
            tmp.should.have.property('transactions');

        });

        it('Should register a mongoose model named aliases', function(){
            (function(){
              model = mongoose.model('checkouts');
            }).should.not.throw();
        });

    });

});
