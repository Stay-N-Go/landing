import Map "mo:core/Map";
import Array "mo:core/Array";
import Iter "mo:core/Iter";
import Text "mo:core/Text";
import Runtime "mo:core/Runtime";
import Nat "mo:core/Nat";
import Order "mo:core/Order";

actor {
  type Lead = {
    name : Text;
    email : Text;
    phone : Text;
    message : Text;
  };

  module Lead {
    public func compare(lead1 : Lead, lead2 : Lead) : Order.Order {
      Text.compare(lead1.name, lead2.name);
    };
  };

  let leads = Map.empty<Nat, Lead>();
  var nextId = 0;

  public shared ({ caller }) func submitLead(name : Text, email : Text, phone : Text, message : Text) : async () {
    let id = nextId;
    nextId += 1;
    let lead : Lead = {
      name;
      email;
      phone;
      message;
    };
    leads.add(id, lead);
  };

  public query ({ caller }) func getAllLeads() : async [Lead] {
    leads.values().toArray().sort();
  };

  func getLeadInternal(id : Nat) : Lead {
    switch (leads.get(id)) {
      case (null) { Runtime.trap("Lead does not exist") };
      case (?lead) { lead };
    };
  };

  public query ({ caller }) func getLead(id : Nat) : async Lead {
    getLeadInternal(id);
  };
};
