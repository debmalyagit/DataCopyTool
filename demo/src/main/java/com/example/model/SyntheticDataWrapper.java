package com.example.model;

import java.util.List;

public class SyntheticDataWrapper {
        List<SyntheticJoins> syntheticJoins ;
        List<SyntheticCriteria> syntheticCriteria;

        public List<SyntheticJoins> getSyntheticJoins() {
            return syntheticJoins;
        }

        public void setSyntheticJoins(List<SyntheticJoins> syntheticJoins) {
            this.syntheticJoins = syntheticJoins;
        }

        public List<SyntheticCriteria> getSyntheticCriteria() {
            return syntheticCriteria;
        }

        public void setSyntheticCriteria(List<SyntheticCriteria> syntheticCriteria) {
            this.syntheticCriteria = syntheticCriteria;
        }

}